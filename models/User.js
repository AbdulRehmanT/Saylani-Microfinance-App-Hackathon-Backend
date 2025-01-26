import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  cnic: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});

const Registration = mongoose.model("Registration", registrationSchema);
