import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true, 
    },
    subject: {
      type: String,
      required: true,  
    },
    startTime: {
      type: String,
      required: true,  
    },
    endTime: {
      type: String,
      required: true,  
    },
    teacherId: {
      type: Number,
      required: true,  
    },
    classroomId: {
      type: Number,
      required: true,  
    }
  },
  { timestamps: true }  
);


const TimeTableModel = mongoose.models.TimeTable || mongoose.model("TimeTable", timetableSchema);

export default TimeTableModel;
