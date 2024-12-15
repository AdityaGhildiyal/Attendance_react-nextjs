import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
      unique: true,
    },
    subjects: [
      {
        subjectName: {
          type: String,
          required: true,
        },
        faculty: {
          type: String,
          required: true,
        },
        totalLectures: {
          type: Number,
          required: true,
        },
        attended: {
          type: Number,
          required: true,
        },
        attendancePercentage: {
          type: Number,
          required: true,
        },
      },
    ],
  },
);

const AttendanceModel = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

export default AttendanceModel;
