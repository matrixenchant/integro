import { Schema, model } from 'mongoose';

const AwardSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    collection: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    variants: {
      type: Array,
      default: []
      /*
      type: String
      label: String
      background: String
      quantity: Number
      imgs: String[<url>]
      */
    },
    cost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Award = model('Award', AwardSchema);

module.exports = Award;
