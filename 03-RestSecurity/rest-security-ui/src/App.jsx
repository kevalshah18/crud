import React, { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api/employeeApi";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeFormModal from "./components/EmployeeFormModal";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }

  function showToast(msg, timeout = 2500) {
    setToast(msg);
    setTimeout(() => setToast(null), timeout);
  }

  const handleAddClick = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (emp) => {
    setEditing(emp);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      setEmployees((p) => p.filter((x) => x.id !== id));
      showToast("Deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete");
    }
  };

  const handleSave = async (payload) => {
    try {
      if (payload.id) {
        const updated = await updateEmployee(payload);
        setEmployees((p) => p.map((x) => (x.id === updated.id ? updated : x)));
        showToast("Updated successfully");
      } else {
        const created = await createEmployee(payload);
        setEmployees((p) => [...p, created]);
        showToast("Added successfully");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Save failed");
    }
  };

  return (
    <div className="container">
      <header className="topbar">
        <h1>Employee Manager</h1>
        <div>
          <button className="btn primary" onClick={handleAddClick}>➕ Add Employee</button>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="loading">Loading employees…</div>
        ) : (
          <EmployeeGrid employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>

      <EmployeeFormModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        employee={editing}
        onSave={handleSave}
      />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
