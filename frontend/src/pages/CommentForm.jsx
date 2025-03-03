import { useState } from "react";
import axios from "axios";

const CommentForm = ({ appointmentId, doctorId, refreshAppointments }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8090/api/appointments/update-comment",
        {
          id: appointmentId,
          doctorId: doctorId,
          comment: comment,
        }
      );

      alert(response.data);
      setComment(""); // Clear the comment field
      refreshAppointments(); // Refresh the table to reflect updated status
    } catch (error) {
      alert("Error updating comment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <label className="form-label">Leave a Comment / Prescription</label>
      <textarea
        className="form-control"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment"
      ></textarea>
      <button type="submit" className="btn btn-success mt-2">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
