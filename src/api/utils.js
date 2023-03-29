const API_BASE = "http://localhost:3000";
export const fetcher = (endpoint, options) =>
  fetch(`${API_BASE}${endpoint}`, options).then((res) => res.json());
