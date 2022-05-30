const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: 'first name is required',
    },
    lastName: {
      type: String,
      trim: true,
      required: 'last name is required',
    },
    phone: {
      type: String,
      trim: true,
      unique: 'Phone number already exists',
      required: 'phone number is required',
    },
    city: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: 'Email already exists',
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: 'Email is required',
    },
    postalCode: {
      type: Number,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      required: 'Country is required',
    },
    state: {
      type: String,
      trim: true,
      required: 'State is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User',
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: 'adminPhoto.jpg',
    },
    wallets: {
      eth: {
        type: String,
      },
      btc: {
        type: String,
      },
    },
    TwoFA: {
      type: Boolean,
      default: false,
    },
    referer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

export default User;
