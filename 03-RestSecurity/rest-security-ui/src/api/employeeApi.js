const BASE = "/api/employees";

export async function getEmployees(user) {
  const res = await fetch(BASE, {
    headers: user
      ? {
          "Content-Type": "application/json",
          "X-Username": user.username, // pass username to backend if needed
        }
      : { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

export async function createEmployee(payload, user) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Username": user.username,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  return res.json();
}

export async function updateEmployee(payload, user) {
  const res = await fetch(BASE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Username": user.username,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
}

export async function deleteEmployee(id, user) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "X-Username": user.username,
    },
  });
  if (!res.ok) throw new Error("Failed to delete employee");
  return res.text();
}
