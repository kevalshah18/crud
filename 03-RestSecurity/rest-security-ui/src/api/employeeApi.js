const BASE = "/api/employees";

export async function getEmployees() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

export async function getEmployee(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch employee");
  return res.json();
}

export async function createEmployee(payload) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  return res.json();
}

export async function updateEmployee(payload) {
  // your backend uses PUT /api/employees for full update (id present in body)
  const res = await fetch(BASE, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
}

export async function patchEmployee(id, patch) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error("Failed to patch employee");
  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete employee");
  // backend returns a message string - return that
  return res.text();
}
