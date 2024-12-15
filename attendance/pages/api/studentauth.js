import jwt from "jsonwebtoken";
import connectDB from "../../lib/mongodb";
import Student from "../../models/StudentModel"; 

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await connectDB(); 
  if (req.method === "POST") {
    const { action } = req.query;

    if (action === "login") {
      return loginStudent(req, res);
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
async function loginStudent(req, res) {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    if (password !== student.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: student._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
