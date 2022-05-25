const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema(
  {
    plan: {
      type: Number,
      required: 'plan is required',
    },
    capital: {
      type: Number,
      required: 'capital is required',
    },
    approvedDate: {
      type: Date,
    },
    withDrawalDate: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'ended'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Investment = mongoose.model('Investment', InvestmentSchema);

export default Investment;
