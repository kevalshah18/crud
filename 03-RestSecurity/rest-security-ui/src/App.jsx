import React, { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api/employeeApi";
import EmployeeGrid from "./components/EmployeeGrid";
import EmployeeFormModal from "./components/EmployeeFormModal";
import LoginPage from "./components/LoginPage";

export default function App() {
  const [user, setUser] = useState(null); // stores login info and roles
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData); // store username and roles returned from backend
    fetchAll();
  };

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

  const handleDeleteClick = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeleteEmployee = async () => {
    try {
      await deleteEmployee(confirmDelete);
      setEmployees((p) => p.filter((x) => x.id !== confirmDelete));
      showToast("Deleted successfully");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete");
    } finally {
      setConfirmDelete(null);
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

  // Conditional rendering: show login page if not logged in
  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="container">
      <header className="topbar">
        <h1>Employee Manager</h1>
        <div>
          {user.roles.includes("MANAGER") && (
            <button className="btn primary" onClick={handleAddClick}>
              ➕ Add Employee
            </button>
          )}
        </div>
      </header>

      <main>
        {loading ? (
          <div className="loading">Loading employees…</div>
        ) : (
          <EmployeeGrid
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            userRoles={user.roles}
          />
        )}
      </main>

      <EmployeeFormModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        employee={editing}
        onSave={handleSave}
      />

      {confirmDelete !== null && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Confirm Delete?</h2>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button className="btn danger" onClick={confirmDeleteEmployee}>
                Yes, Delete
              </button>
              <button className="btn" onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
