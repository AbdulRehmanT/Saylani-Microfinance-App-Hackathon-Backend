// models/Loan.js
import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  selectedCategory: {
    type: String,
    required: true,
  },
  selectedSubcategory: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  initialDeposit: {
    type: Number,
    required: true,
  },
  monthlyEMI: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Loan = mongoose.models.Loan || mongoose.model('Loan', loanSchema);

export { Loan };
