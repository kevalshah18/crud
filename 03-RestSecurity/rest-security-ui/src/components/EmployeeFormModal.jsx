import React, { useEffect, useState } from "react";

export default function EmployeeFormModal({ show, onClose, employee, onSave }) {
  // employee may be null for "Add"
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (employee) {
      setForm({
        id: employee.id,
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
      });
    } else {
      setForm({ firstName: "", lastName: "", email: "" });
    }
    setError("");
  }, [employee, show]);

  useEffect(() => {
    // close on Escape
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (show) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

  if (!show) return null;

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";
    // basic email validation
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    onSave(form);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h3>{form.id ? "Edit Employee" : "Add Employee"}</h3>
          <button className="btn-close" onClick={onClose} aria-label="Close">✖</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            First name
            <input name="firstName" value={form.firstName} onChange={(e)=>setForm({...form, firstName:e.target.value})} />
          </label>

          <label>
            Last name
            <input name="lastName" value={form.lastName} onChange={(e)=>setForm({...form, lastName:e.target.value})} />
          </label>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
          </label>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">{form.id ? "Save changes" : "Add employee"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
