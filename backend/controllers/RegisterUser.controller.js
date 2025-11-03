import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
try {
const { name, email, password,role } = req.body;

// Validating the inputs which are given by the user
if (!name || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "All fields (name, email, password) are required",
  });
}

//this Check if user already exists or not?
const existingUser = await userModel.findOne({ email });
if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "User already exists with this email",
  });
}

// next step hasing the password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// now Creating a  new user
const newUser = await userModel.create({
  name,
  email,
  password: hashedPassword,
  role: role || "user" 
});

// Remove sensitive data before sending response
const { password: _, ...safeUser } = newUser.toObject();

return res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: safeUser,
});


} catch (error) {
console.error("Error registering user:", error);
return res.status(500).json({
success: false,
message: "Internal server error",
error: error.message,
});
}
};

export { registerUser };