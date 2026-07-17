const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Generic request helper used by every view/component.
 * Reads the auth token from localStorage on each call so it always
 * sends the latest token without needing to be re-instantiated.
 */
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('token')

  const response = await fetch(API_BASE + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }
  return data
}

export const api = {
  get: (path) => apiRequest(path),
  post: (path, body) => apiRequest(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => apiRequest(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => apiRequest(path, { method: 'DELETE' }),
}
