import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  department: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  dob: { type: String, required: true },
  joiningDate: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
});

const teachers = mongoose.models.teacher || mongoose.model("teacher", teacherSchema);

export default teachers;
