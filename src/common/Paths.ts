/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Post: {
    Base: "/posts",
    Get: "/all",
    Add: "/new",
  },
} as const;
