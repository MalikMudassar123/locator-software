// Export all utility functions from a single entry point

/**
 * Sleep for a specified number of milliseconds
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check if code is running on the client side
 */
export const isClient = typeof window !== "undefined";

/**
 * Check if code is running on the server side
 */
export const isServer = typeof window === "undefined";

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Generate a random ID
 */
export const generateId = (): string =>
  Math.random().toString(36).substring(2, 9);
