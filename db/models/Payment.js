import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'pending',
    },
    projectId: Schema.Types.ObjectId,
    price: Number,
    info: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

const Payment = model('Payment', PaymentSchema);

module.exports = Payment;
