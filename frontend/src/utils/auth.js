const STORAGE_KEY = 'moviehub_auth';

export function saveAuth(token, user) {
  const payload = { token, user };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse auth from localStorage', e);
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAuthHeaders() {
  const auth = getAuth();
  if (!auth || !auth.token) return {};
  return {
    Authorization: `Bearer ${auth.token}`,
  };
}
