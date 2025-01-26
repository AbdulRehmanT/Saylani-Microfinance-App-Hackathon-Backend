import express from "express";
import cors from "cors";
import "dotenv/config";
import "./database.js";
import { Loan } from "./models/Loan.js";
import { Registration } from "./models/User.js";
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors({}));

app.post("/api/v1/loan", async (req, res) => {
  const {
    selectedCategory,
    selectedSubcategory,
    loanAmount,
    initialDeposit,
    monthlyEMI,
  } = req.body;

  console.log("Received loan data:", req.body);

  if (
    !selectedCategory ||
    !selectedSubcategory ||
    !loanAmount ||
    !initialDeposit ||
    !monthlyEMI
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newLoan = new Loan({
      selectedCategory,
      selectedSubcategory,
      loanAmount,
      initialDeposit,
      monthlyEMI,
    });

    await newLoan.save();

    res.status(201).json({
      message: "Loan application saved successfully",
      loan: newLoan,
    });
  } catch (error) {
    console.error("Error saving loan data:", error);
    res.status(500).json({ message: "Failed to save loan data" });
  }
});

app.post('/api/v1/register', async (req, res) => {
  const { cnic, email, name } = req.body;

  // Validate required fields
  if (!cnic || !email || !name) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Save registration data to the database
    const newRegistration =new Registration({
      cnic,
      email,
      name,
    });
    await newRegistration.save();

    return res.status(201).json({
      message: 'Registration successful!',
      registration: newRegistration,
    });
  } catch (error) {
    console.error('Error saving registration data:', error); // Detailed error log
    return res.status(500).json({ message: 'Failed to save registration data', error: error.message });
  }
});

app.post("/api/loanRequest", async (req, res) => {
  try {
    const loanRequestData = req.body;
    
    // Create a new LoanRequest document
    const newLoanRequest = new LoanRequest(loanRequestData);

    // Save it to the database
    await newLoanRequest.save();

    // Send a success response
    res.status(201).json({ message: "Loan Request submitted successfully", loanRequest: newLoanRequest });
  } catch (error) {
    res.status(500).json({ message: "Error saving loan request", error });
  }
});

app.use((request, response) => {
  response.status(404).send({ message: "no route found!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
