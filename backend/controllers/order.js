/* eslint-disable camelcase */
const {
  createOrderValidation,
} = require('../helper/orderValidation/orderValidation');
const Order = require('../models/Order/Order');

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
    payment_source: { network: 'ethereum' },
    intent,
    payer,
    purchase_units,
    status,
    links: [],
  };
  return response;
};

/** **********************CREATE ORDER HANDLER*********************** */
exports.createOrder = async (req, res) => {
  // validate received data before creating a order
  const { error } = createOrderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // create new order with received data
  const creationTime = new Date().toISOString();
  const order = new Order({
    ...req.body,
    status: 'CREATED',
    create_time: creationTime,
    update_time: creationTime,
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
