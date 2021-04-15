/*
 * Validation of send authentification data to reject
 * requests with wrong formated data
 */
const Joi = require('@hapi/joi');

//----------------------------------------------------------------------
//            set up joi validation of update order data
//----------------------------------------------------------------------
exports.updateOrderValidation = (data) => {
  const patch = Joi.object({
    op: Joi.string().required().valid('add', 'remove', 'replace'),
    path: [
      Joi.string().valid('intent', 'payer', 'purchase_units'),
      Joi.string().regex(/^(purchase_units\[)\d+(\])$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(custom_id)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(description)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(soft_descriptor)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(amount)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(invoice_id)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(payment_instruction)$/),
      Joi.string().regex(
        /^(purchase_units\[)\d+(\])\.(payment_instruction)\.(disbursement_mode)$/
      ),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(payee)\.(email)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(shipping)\.(name)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(shipping)\.(address)$/),
      Joi.string().regex(/^(purchase_units\[)\d+(\])\.(shipping)\.(type)$/),
    ],
    value: Joi.any(),
    from: Joi.string(),
  });

  const updateObject = Joi.object({
    patch_request: Joi.array().items(patch),
  });

  return updateObject.validate(data);
};

//----------------------------------------------------------------------
//            set up joi validation of create order data
//----------------------------------------------------------------------
exports.createOrderValidation = (data) => {
  // general objects
  const money = Joi.object({
    currency_code: Joi.string().min(3).max(3).required(),
    value: Joi.string()
      .required()
      .max(32)
      .regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
  });
  const payeeBase = Joi.object({
    email_address: Joi.string().email(),
    merchant_id: Joi.string().min(1).max(50),
  });
  // Payee subobjects-----------------------------------------------
  const address = Joi.object({
    address_line_1: Joi.string().max(300),
    address_line_2: Joi.string().max(300),
    admin_area_1: Joi.string().max(300),
    admin_area_2: Joi.string().max(120),
    postal_code: Joi.string().max(60),
    country: Joi.string().required(),
  });

  const taxInfo = Joi.object({
    tax_id: Joi.string().required().max(14),
    tax_id_type: Joi.string().required().valid('BR_CPF', 'BR_CNPJ'),
  });

  const phoneNumber = Joi.object({
    national_number: Joi.string()
      .required()
      .min(1)
      .max(14)
      .regex(/^[0-9]{1,14}?$/),
  });

  const phone = Joi.object({
    phone_type: Joi.string().valid('FAX', 'HOME', 'MOBILE', 'OTHER', 'PAGER'),
    phone_number: phoneNumber.required(),
  });

  const name = Joi.object({
    prefix: Joi.string().max(140),
    given_name: Joi.string().max(140),
    surname: Joi.string().max(140),
    middle_name: Joi.string().max(140),
    suffix: Joi.string().max(140),
    full_name: Joi.string().max(300),
  });

  const payer = Joi.object({
    email_address: Joi.string().max(254).email(),
    payer_id: Joi.string().min(13),
    name,
    phone,
    birth_date: Joi.string(),
    tax_info: taxInfo,
    address,
  });

  // purchase unit subobjects --------------------------------------------
  const platformFee = Joi.object({
    amount: money.required(),
    payee: payeeBase,
  });

  const paymentInstructions = Joi.object({
    platform_fees: Joi.array().items(platformFee),
    disbursement_mode: Joi.string().valid('INSTANT', 'DELAYED'),
  });

  const breakdown = Joi.object({
    item_total: money,
    shipping: money,
    handling: money,
    tax_total: money,
    insurance: money,
    shipping_discount: money,
    discount: money,
  });
  const amount = Joi.object({
    currency_code: Joi.string().min(3).max(3).required(),
    value: Joi.string()
      .required()
      .max(32)
      .regex(/^((-?[0-9]+)|(-?([0-9]+)?[.][0-9]+))$/),
    breakdown,
  });

  const item = Joi.object({
    name: Joi.string().min(1).max(127).required(),
    unit_amount: money.required(),
    tax: money,
    quantity: Joi.string()
      .max(10)
      .regex(/^[1-9][0-9]{0,9}$/)
      .required(),
    description: Joi.string().max(127),
    sku: Joi.string().max(127),
    category: Joi.string()
      .min(1)
      .max(20)
      .valid('DIGITAL_GOODS', 'PHYSICAL_GOODS'),
  });

  const shipping = Joi.object({
    name: Joi.object({ full_name: Joi.string().max(300) }),
    type: Joi.string().min(1).max(255).valid('PICKUP_IN_PERSON', 'SHIPPING'),
    address,
  });

  const purchaseUnit = Joi.object({
    reference_id: Joi.string().max(256),
    amount: amount.required(),
    payee: payeeBase,
    payment_instructions: paymentInstructions,
    description: Joi.string().max(127),
    custom_id: Joi.string().max(127),
    invoice_id: Joi.string().max(127),
    soft_descriptor: Joi.string().max(22),
    items: Joi.array().items(item),
    shipping,
  });

  // application context subobjects-------------------------------------------
  const paymentMethod = Joi.object({
    payer_selected: Joi.string().min(1),
    payee_preferred: Joi.string().valid(
      'UNRESTRICTED',
      'IMMEDIATE_PAYMENT_REQUIRED'
    ),
    standard_entry_class_code: Joi.string()
      .min(3)
      .max(255)
      .valid('TEL', 'WEB', 'CCD', 'PPD'),
  });

  const transRef = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    id: Joi.string()
      .min(9)
      .max(15)
      .regex(/^[a-zA-Z0-9]+$/)
      .required(),
    date: Joi.string()
      .min(4)
      .max(4)
      .regex(/^[0-9]+$/),
    network: Joi.string().required(),
  });

  const paymentSource = Joi.object({
    payment_initiator: Joi.string()
      .min(1)
      .max(255)
      .regex(/^[0-9A-Z_]+$/)
      .valid('CUSTOMER', 'MERCHANT')
      .required(),
    payment_type: Joi.string()
      .min(1)
      .max(255)
      .regex(/^[0-9A-Z_]+$/)
      .valid('ONE_TIME', 'RECURRING', 'UNSCHEDULED')
      .required(),
    usage: Joi.string()
      .min(1)
      .max(255)
      .regex(/^[0-9A-Z_]+$/)
      .valid('FIRST', 'SUBSEQUENT', 'DERIVED'),
    previous_network_transaction_reference: transRef,
  });

  const applicationContext = Joi.object({
    brand_name: Joi.string().max(127),
    locale: Joi.string()
      .min(2)
      .max(10)
      .regex(/^[a-z]{2}$/),
    landing_page: Joi.string().valid('LOGIN', 'BILLING', 'NO_PREFERENCE'),
    shipping_preference: Joi.string().valid(
      'GET_FROM_FILE',
      'NO_SHIPPING',
      'SET_PROVIDED_ADDRESS'
    ),
    user_action: Joi.string().valid('CONTINUE', 'PAY_NOW'),
    payment_method: paymentMethod,
    return_url: Joi.string(),
    cancel_url: Joi.string(),
    stored_payment_source: paymentSource,
  });

  //   Order object----------------------------------------------
  const order = Joi.object({
    intent: Joi.string().valid('CAPTURE', 'AUTHORIZE').required(),
    payer,
    purchase_units: Joi.array().items(purchaseUnit).required(),
    application_context: applicationContext,
  });

  return order.validate(data);
};
