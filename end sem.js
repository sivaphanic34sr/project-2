import React, { useReducer } from "react";

const initialStudents = [
  { id: 1, name: "John Doe", status: "Not Marked" },
  { id: 2, name: "Emma Smith", status: "Not Marked" },
  { id: 3, name: "Aarav Kumar", status: "Not Marked" },
];

// ---------------- Reducer ----------------
function attendanceReducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, status: "Present" }
          : student
      );

    case "MARK_ABSENT":
      return state.map((student) =>
        student.id === action.id
          ? { ...student, status: "Absent" }
          : student
      );

    case "RESET":
      return state.map((s) => ({ ...s, status: "Not Marked" }));

    default:
      return state;
  }
}

// ---------------- Component ----------------
export default function AttendanceTracker() {
  const [students, dispatch] = useReducer(attendanceReducer, initialStudents);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📘 Student Attendance Tracker</h2>

      <button
        onClick={() => dispatch({ type: "RESET" })}
        style={{
          marginBottom: "15px",
          padding: "8px 20px",
          background: "#444",
          color: "#fff",
          border: "none",
        }}
      >
        Reset Attendance
      </button>

      {/* Table */}
      <table border="1" cellPadding="10" width="60%">
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td
                style={{
                  color:
                    student.status === "Present"
                      ? "green"
                      : student.status === "Absent"
                      ? "red"
                      : "black",
                  fontWeight: "bold",
                }}
              >
                {student.status}
              </td>
              <td>
                <button
                  onClick={() =>
                    dispatch({ type: "MARK_PRESENT", id: student.id })
                  }
                  style={{ marginRight: "10px" }}
                >
                  Present
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: "MARK_ABSENT", id: student.id })
                  }
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
