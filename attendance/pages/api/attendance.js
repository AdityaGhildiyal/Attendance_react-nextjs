import { getSession } from "next-auth/react";
import { connectDB } from "../../lib/mongodb"; // Utility function to connect to MongoDB
import AttendanceModel from "../../models/attendanceModel"; // The model for attendance

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get the user session
    const session = await getSession({ req });

    // Check if the user is authenticated
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { email } = session.user; // Get email from session

    try {
      // Connect to the MongoDB database
      const connection = await connectDB();
      const database = connection.useDb("attendanceproject"); // Ensure you're using the 'attendanceproject' database

      // Fetch the attendance data for the student from the attendance collection
      const attendanceData = await database.collection("attendance").findOne({ studentEmail: email });

      if (!attendanceData) {
        return res.status(404).json({ message: "Attendance data not found" });
      }

      // Extract and return subject-wise attendance data
      const subjectWiseAttendance = attendanceData.subjects.map((subject) => ({
        subjectName: subject.subjectName,
        faculty: subject.faculty,
        totalLectures: subject.totalLectures,
        attended: subject.attended,
        attendancePercentage: subject.attendancePercentage,
      }));

      return res.status(200).json(subjectWiseAttendance);
    } catch (error) {
      console.error("Error fetching subject-wise attendance:", error);
      return res.status(500).json({ message: "Error fetching attendance" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
