/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const Order = require('../models/Order/Order');
const Payment = require('../models/Payment/Payment');
const Wallet = require('../models/Wallets/Wallet');
const { sendPayment } = require('../helper/wallet/transactions/payment');

// creates the response object out of the orders object
// in the correct format for sending back to client
const createResponseFormat = (orderData) => {
  // fetch needed data from order object
  const {
    create_time,
    update_time,
    _id,
    intent,
    payer,
    purchase_units,
    status,
  } = orderData;
  // send response object
  const response = {
    create_time,
    update_time,
    id: _id,
    payment_source: { network: 'evm' },
    intent,
    payer,
    purchase_units,
    status,
    links: [],
  };
  return response;
};

// function use by update handler to check if an operation is
// allowed on requested path. Returns a boolean
const checkIfActionAllowed = (patchItem) => {
  const strArr = patchItem.path.split(/[\\[.]+/);
  const action = patchItem.op;
  let allowed = false;
  switch (action) {
    case 'add':
      if (strArr[3]) {
        if (
          strArr[3] === 'name' ||
          strArr[3] === 'type' ||
          strArr[3] === 'address' ||
          strArr[3] === 'disbursement_mode' ||
          strArr[3] === 'email'
        ) {
          allowed = true;
        }
      } else if (strArr[2]) {
        if (
          strArr[2] === 'custom_id' ||
          strArr[2] === 'description' ||
          strArr[2] === 'invoice_id'
        ) {
          allowed = true;
        }
      } else if (strArr[0] === 'payer' || strArr[0] === 'purchase_units') {
        allowed = true;
      }
      break;
    case 'replace':
      if (
        strArr[0] === 'intent' ||
        strArr[0] === 'payer' ||
        strArr[0] === 'purchase_units'
      ) {
        allowed = true;
      }
      break;
    case 'remove':
      if (
        strArr[2] &&
        (strArr[2] === 'custom_id' ||
          strArr[2] === 'description' ||
          strArr[2] === 'soft_descriptor' ||
          strArr[2] === 'invoice_id')
      ) {
        allowed = true;
      }
      break;
    default:
      allowed = false;
      break;
  }
  return allowed;
};

// function used by udpate handler to set a value of requested path
// extract identifier of object out of path and set the values
const addParameter = (order, patchItem) => {
  const strArr = patchItem.path.split(/[\\[.]+/);
  if (strArr.length > 1) {
    const index = parseInt(strArr[1], 10);
    if (strArr > 3) {
      order[strArr[0]][index][strArr[2]][strArr[3]] = patchItem.value;
    } else if (strArr[2]) {
      order[strArr[0]][index][strArr[2]] = patchItem.value;
    } else {
      order[strArr[0]][index] = patchItem.value;
    }
  } else {
    order[patchItem.path] = patchItem.value;
  }
  return order;
};

/** **********************CREATE ORDER HANDLER*********************** */
exports.createOrder = async (req, res) => {
  const { user } = req;
  const payeeWallet = await Wallet.findOne({ user_id: user._id });

  // create new order with received data
  const creationTime = new Date().toISOString();
  const order = new Order({
    ...req.body,
    status: 'CREATED',
    create_time: creationTime,
    update_time: creationTime,
    payee_address: payeeWallet.address,
  });

  try {
    // save new order in database
    const savedOrder = await order.save();
    // send created order response
    const response = createResponseFormat(savedOrder);
    res.status(201).send(response);
  } catch (err) {
    if (err.code === 11000) return res.status(400).send('Duplicated id.');
    res.status(400).send('Failed saving order.');
  }
};

/** **********************GET ORDER HANDLER*********************** */
exports.getOrder = async (req, res) => {
  // fetch data from database and create response object
  try {
    const requestedOrder = await Order.findById(req.params.id);
    const response = createResponseFormat(requestedOrder);
    res.status(201).send(response);
  } catch (err) {
    res.status(400).send('Order not found.');
  }
};

/** **********************UPDATE ORDER HANDLER*********************** */
exports.updateOrder = async (req, res) => {
  const patchRequest = req.body.patch_request;
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(201).send('Queried order not found.');

    // for all patch objects check if operation is allowed and update
    // given value for requested path
    for (let i = 0; i < patchRequest.length; i++) {
      if (checkIfActionAllowed(patchRequest[i])) {
        if (patchRequest[i].op === 'add' || patchRequest[i].op === 'replace') {
          order = addParameter(order, patchRequest[i]);
        } else {
          const emptyObject = { path: patchRequest[i].path, value: undefined };
          order = addParameter(order, emptyObject);
        }
      } else {
        return res
          .status(400)
          .send(
            `It is not allowed to call "${patchRequest[i].op}" on ${patchRequest[i].path}`
          );
      }
    }
    // save changed order
    order.update_time = new Date().toISOString();
    await order.save();
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/** ********************AUTHORIZE PAYMENT FOR ORDER HANDLER********************** */
exports.authorizePayment = async (req, res) => {
  const requestedOrder = await Order.findById(req.params.id);

  // update order with payer information
  const { user } = req;
  const payer = {
    email_address: user.login_name,
    payer_id: user._id,
    name: {
      given_name: user.given_name,
      middle_name: '',
      surname: user.family_name,
      full_name: `${user.given_name} ${user.family_name}`,
    },
    phone: {
      phone_type: 'HOME',
      phone_number: {
        national_number: user.phone,
      },
    },
    tax_info: {
      tax_id: '',
      tax_id_type: 'BR_CPF',
    },
    address: {
      address_line_1: user.address.street_address,
      address_line_2: `${user.address.postal_code} ${user.address.locality}`,
      admin_area_1: user.address.region,
      country: user.address.country,
    },
  };
  requestedOrder.payer = payer;

  // calculate total price of order for payment
  let totalAmount = 0;
  const currencyCode = requestedOrder.purchase_units[0].amount.currency_code;
  requestedOrder.purchase_units.forEach((purchaseUnit) => {
    totalAmount += parseFloat(purchaseUnit.amount.value);
  });

  // calculate expiration date for payment
  const creationTime = new Date().toISOString();
  const expirationDate = new Date();
  const days = 3;
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);

  // create payment object for order
  const payment = new Payment({
    status: 'CREATED',
    amount: { value: totalAmount, currency_code: currencyCode },
    order_id: req.params.id,
    final_capture: false,
    disbursement_mode: 'INSTANT',
    expiration_time: expirationDate.toISOString(),
    create_time: creationTime,
    update_time: creationTime,
  });

  // save new payment in database
  try {
    const savedPayment = await payment.save();
    await requestedOrder.save();
    res.status(201).send(savedPayment);
  } catch (err) {
    res.status(400).send('Failed saving Payment.');
  }
};

/** ********************CAPTURE PAYMENT FOR ORDER HANDLER********************** */
exports.capturePayment = async (req, res) => {
  const requestedOrder = await Order.findById(req.params.id);
  const payment = await Payment.findOne({ order_id: req.params.id });
  const currentTimestamp = new Date().toISOString();

  // get transaction related data
  const { user } = req;
  const to = requestedOrder.payee_address;
  const { value } = payment.amount;
  const description = `Order number ${req.params.id}`;

  const wallet = await Wallet.findOne({ user_id: user._id });
  const from = wallet.address;
  const sk = wallet.privateKey;

  // send transaction from payer to merchant
  await sendPayment(from, to, value, sk, description)
    .then(async (hash) => {
      payment.status = 'CAPTURED';
      payment.final_capture = true;
      payment.update_time = currentTimestamp;
      payment.transaction_hash = hash;
      await payment.save();

      requestedOrder.update_time = currentTimestamp;
      requestedOrder.status = 'COMPLETED';
      await requestedOrder.save();
      res.status(200).send(requestedOrder);
    })
    .catch((err) => res.status(400).send(err.message));
};
