// Application-wide constants

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || "Next.js Production App";

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const;

export const API_ENDPOINTS = {
  // Add your API endpoints here
} as const;
