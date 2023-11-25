import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    validation: {
      type: String,
      default: null,
    },
    rank: {
      type: String,
      default: 'newbie',
    },
    name: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: null,
    },
    overallBalance: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    donations: {
      type: Number,
      default: 0,
    },
    awards: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

module.exports = User;
