import React from "react";

/**
 * EmployeeCard
 * props:
 *  - emp: { id, firstName, lastName, email }
 *  - onEdit(emp)
 *  - onDelete(id)
 */
export default function EmployeeCard({ emp, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <span className="name">{emp.firstName} {emp.lastName}</span>
          <span className="id">#{emp.id}</span>
        </div>
        <div className="email">{emp.email}</div>
      </div>

      <div className="card-actions">
        <button className="btn btn-icon" onClick={() => onEdit(emp)} aria-label="Edit">
          ✏️
        </button>
        <button className="btn btn-icon danger" onClick={() => onDelete(emp.id)} aria-label="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}
