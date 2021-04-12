/* eslint-disable camelcase */
const {
  createOrderValidation,
} = require('../helper/orderValidation/orderValidation');
const Order = require('../models/Order/Order');

/** **********************Create Order HANDLER*********************** */
exports.createOrder = async (req, res) => {
  //   const { user } = req;

  // validate received data before creating a product
  const { error } = createOrderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // create new order with received data
  const creationTime = new Date();
  const order = new Order({
    ...req.body,
    status: 'CREATED',
    create_time: creationTime,
    update_time: creationTime,
  });

  try {
    // save new product in database
    const savedOrder = await order.save();
    // send created order response
    const {
      create_time,
      update_time,
      _id,
      intent,
      payer,
      purchase_units,
      status,
    } = savedOrder;
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
    res.status(201).send(response);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) return res.status(400).send('Duplicated id.');
    res.status(400).send('Failed saving product.');
  }
};
