const mongoose = require('mongoose');

// general schemas
const money = new mongoose.Schema(
  {
    currency_code: {
      type: String,
      min: 3,
      max: 3,
      required: true,
    },
    value: {
      type: String,
      max: 32,
      required: true,
    },
  },
  { _id: false, strict: 'throw' }
);

const payeeBase = new mongoose.Schema(
  {
    email_address: {
      type: String,
      min: 3,
      max: 255,
    },
    merchant_id: {
      type: String,
      min: 1,
      max: 50,
    },
  },
  { _id: false, strict: 'throw' }
);

// Payee subschemas-----------------------------------------------
const address = new mongoose.Schema(
  {
    address_line_1: {
      type: String,
      max: 300,
    },
    address_line_2: {
      type: String,
      max: 300,
    },
    admin_area_1: {
      type: String,
      max: 300,
    },
    admin_area_2: {
      type: String,
      max: 300,
    },
    postal_code: {
      type: String,
      max: 60,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { _id: false, strict: 'throw' }
);

const taxInfo = new mongoose.Schema(
  {
    tax_id: {
      type: String,
      max: 14,
      required: true,
    },
    tax_id_type: {
      type: String,
      required: true,
      enum: ['BR_CPF', 'BR_CNPJ'],
    },
  },
  { _id: false, strict: 'throw' }
);

const phoneNumber = new mongoose.Schema(
  {
    national_number: {
      type: String,
      required: true,
      min: 1,
      max: 14,
    },
  },
  { _id: false, strict: 'throw' }
);

const phone = new mongoose.Schema(
  {
    phone_type: {
      type: String,
      enum: ['FAX', 'HOME', 'MOBILE', 'OTHER', 'PAGER'],
    },
    phone_number: phoneNumber,
  },
  { _id: false, strict: 'throw' }
);

const name = new mongoose.Schema(
  {
    prefix: {
      type: String,
      max: 140,
    },
    given_name: {
      type: String,
      max: 140,
    },
    surname: {
      type: String,
      max: 140,
    },
    middle_name: {
      type: String,
      max: 140,
    },
    suffix: {
      type: String,
      max: 140,
    },
    full_name: {
      type: String,
      max: 300,
    },
  },
  { _id: false, strict: 'throw' }
);

const payer = new mongoose.Schema(
  {
    email_address: {
      type: String,
      max: 254,
    },
    payer_id: {
      type: String,
      min: 13,
    },
    name,
    phone,
    birth_date: {
      type: String,
    },
    tax_info: taxInfo,
    address,
  },
  { _id: false, strict: 'throw' }
);

// purchase unit subschemas --------------------------------------------
const platformFee = new mongoose.Schema(
  {
    amount: money,
    payee: payeeBase,
  },
  { _id: false, strict: 'throw' }
);

const paymentInstructions = new mongoose.Schema(
  {
    platform_fees: [platformFee],
    disbursement_mode: { type: String, enum: ['INSTANT', 'DELAYED'] },
  },
  { _id: false, strict: 'throw' }
);

const breakdown = new mongoose.Schema(
  {
    item_total: money,
    shipping: money,
    handling: money,
    tax_total: money,
    insurance: money,
    shipping_discount: money,
    discount: money,
  },
  { _id: false, strict: 'throw' }
);

const amount = new mongoose.Schema(
  {
    currency_code: {
      type: String,
      min: 3,
      max: 3,
      required: true,
    },
    value: {
      type: String,
      max: 32,
      required: true,
    },
    breakdown,
  },
  { _id: false, strict: 'throw' }
);

const item = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 1,
      max: 127,
      required: true,
    },
    unit_amount: money,
    tax: money,
    quantity: {
      type: String,
      max: 10,
      required: true,
    },
    description: {
      type: String,
      max: 127,
    },
    sku: {
      type: String,
      max: 127,
    },
    category: {
      type: String,
      min: 1,
      max: 20,
      enum: ['DIGITAL_GOODS', 'PHYSICAL_GOODS'],
    },
  },
  { _id: false, strict: 'throw' }
);

const shipping = new mongoose.Schema(
  {
    name: {
      full_name: {
        type: String,
        max: 300,
      },
    },
    type: {
      type: String,
      min: 1,
      max: 255,
      enum: ['PICKUP_IN_PERSON', 'SHIPPING'],
    },
    address,
  },
  { _id: false, strict: 'throw' }
);

const purchaseUnit = new mongoose.Schema(
  {
    reference_id: {
      type: String,
      min: 1,
      max: 255,
    },
    amount,
    payee: payeeBase,
    payment_instructions: paymentInstructions,
    description: {
      type: String,
      max: 127,
    },
    custom_id: {
      type: String,
      max: 127,
    },
    invoice_id: {
      type: String,
      max: 127,
    },
    soft_descriptor: {
      type: String,
      max: 22,
    },
    items: [item],
    shipping,
  },
  { _id: false, strict: 'throw' }
);
// application context subschemas-------------------------------------------
const paymentMethod = new mongoose.Schema(
  {
    payer_selected: {
      type: String,
      min: 1,
    },
    payee_preferred: {
      type: String,
      enum: ['UNRESTRICTED', 'IMMEDIATE_PAYMENT_REQUIRED'],
    },
    standard_entry_class_code: {
      type: String,
      min: 3,
      max: 255,
      enum: ['TEL', 'WEB', 'CCD', 'PPD'],
    },
  },
  { _id: false, strict: 'throw' }
);

const transRef = new mongoose.Schema(
  {
    id: {
      type: String,
      min: 9,
      max: 15,
      required: true,
    },
    date: {
      type: String,
      min: 4,
      max: 4,
    },
    network: {
      type: String,
    },
  },
  { _id: false, strict: 'throw' }
);

const paymentSource = new mongoose.Schema(
  {
    payment_initiator: {
      type: String,
      min: 1,
      max: 255,
      required: true,
      enum: ['CUSTOMER', 'MERCHANT'],
    },
    payment_type: {
      type: String,
      min: 1,
      max: 255,
      required: true,
      enum: ['ONE_TIME', 'RECURRING', 'UNSCHEDULED'],
    },
    usage: {
      type: String,
      min: 1,
      max: 255,
      required: true,
      enum: ['FIRST', 'SUBSEQUENT', 'DERIVED'],
    },
    previous_network_transaction_reference: transRef,
  },
  { _id: false, strict: 'throw' }
);

const applicationContext = new mongoose.Schema(
  {
    brand_name: {
      type: String,
      max: 127,
    },
    locale: {
      type: String,
      min: 2,
      max: 10,
    },
    landing_page: {
      type: String,
      enum: ['LOGIN', 'BILLING', 'NO_PREFERENCE'],
    },

    shipping_preference: {
      type: String,
      enum: ['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS'],
    },
    user_action: {
      type: String,
      enum: ['CONTINUE', 'PAY_NOW'],
    },
    payment_method: paymentMethod,
    return_url: { type: String },
    cancel_url: { type: String },
    stored_payment_source: paymentSource,
  },
  { _id: false, strict: 'throw' }
);

//   Order schema----------------------------------------------
const orderSchema = new mongoose.Schema({
  intent: {
    type: String,
    required: true,
    enum: ['CAPTURE', 'AUTHORIZE'],
  },
  payer,
  purchase_units: [purchaseUnit],
  application_context: applicationContext,
  status: {
    type: String,
    min: 1,
    max: 255,
    enum: [
      'CREATED',
      'SAVED',
      'APPROVED',
      'VOIDED',
      'COMPLETED',
      'PAYER_ACTION_REQUIRED',
    ],
  },
  create_time: {
    type: String,
    min: 20,
    max: 64,
  },
  update_time: {
    type: String,
    min: 20,
    max: 64,
  },
});

module.exports = mongoose.model('Order', orderSchema);
