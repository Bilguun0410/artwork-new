import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiUrl = 'http://localhost:4900';

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('token');

  return !!token;
};

