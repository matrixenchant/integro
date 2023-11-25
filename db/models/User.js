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
    role: {
      type: String,
      default: 'user',
    },
    name: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

module.exports = User;
