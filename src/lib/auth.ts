export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("luxfans_user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function requireAuth() {
  const user = getUser();

  if (!user) {
    window.location.href = "/login";
  }

  return user;
}