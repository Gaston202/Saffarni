// src/utils/jwt.js

// Safe JWT decoder (no external library)
export function decodeJwt(token) {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch (err) {
    console.error("decodeJwt failed", err);
    return null;
  }
}
