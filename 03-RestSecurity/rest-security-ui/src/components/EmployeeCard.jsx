import React from "react";

export default function EmployeeCard({ emp, onEdit, onDelete, userRoles }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <span className="name">{emp.name}</span>
          <span className="id">#{emp.id}</span>
        </div>
        <div className="email">{emp.email}</div>
      </div>

      <div className="card-actions">
        {userRoles.includes("MANAGER") && (
          <button className="btn btn-icon" onClick={() => onEdit(emp)}>
            ✏️ Edit
          </button>
        )}
        {userRoles.includes("ADMIN") && (
          <button className="btn btn-icon danger" onClick={() => onDelete(emp.id)}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
}
