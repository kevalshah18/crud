import React from "react";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeGrid({ employees, onEdit, onDelete }) {
  if (!employees || employees.length === 0) {
    return <div className="empty">No employees found.</div>;
  }

  return (
    <div className="grid">
      {employees.map((emp) => (
        <EmployeeCard key={emp.id} emp={emp} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
