import { getSession } from "next-auth/react";
import { connectDB } from "../../lib/mongodb";  // Ensure you have the connectDB utility
import TimeTableModel from "../../models/timetableModel";  // Your TimeTable model

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
      // Get the current day of the week (e.g., "Monday", "Tuesday", etc.)
      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

      // Connect to the 'attendanceproject' database
      const connection = await connectDB();
      const database = connection.useDb('attendanceproject');  // Ensure you're connecting to the correct DB
      const timetableCollection = database.collection('timetable');  // Get the 'timetable' collection

      // Fetch the timetable data for the current day
      const timetableData = await timetableCollection.find({ day: currentDay }).toArray();

      if (!timetableData || timetableData.length === 0) {
        return res.status(404).json({ message: `No classes scheduled for ${currentDay}` });
      }

      return res.status(200).json(timetableData);  // Return the timetable data for the current day
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching timetable' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
