// This file simulates a database for user authentication
// In a real application, you would use a proper database
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this would be hashed
}

// In-memory user store for the MVP
export const users: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@tracktomeasure.com",
    password: "password123", // In production, this would be hashed
  },
];

// User management functions
export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

export function addUser(user: User): User {
  users.push(user);
  return user;
}