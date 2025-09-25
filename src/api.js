const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function handleRes(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || res.statusText || "Request failed";
    throw new Error(msg);
  }
  return data;
}

export async function signupApi(form) {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important for httpOnly cookie
    body: JSON.stringify(form),
  });
  return handleRes(res);
}

export async function loginApi(form) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(form),
  });
  return handleRes(res);
}


export async function logoutApi() {
  const res = await fetch(`${API}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return handleRes(res);
}
export async function getProfileApi() {
  const token = localStorage.getItem("token"); // must exist
  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${API}/api/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include", // in case backend uses cookies too
  });

  return handleRes(res);
}

export async function updateProfileApi(updates) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const res = await fetch(`${API}/api/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
    body: JSON.stringify(updates),
  });
  return handleRes(res);
}