import { z } from 'zod';
import { User, LoginCredentials, JWTPayload } from '../types/auth';

const AUTH_STORAGE_KEY = '@auth_token';
const USER_STORAGE_KEY = '@auth_user';

const HARDCODED_USER = {
  email: 'user@example.com',
  password: 'password123',
  id: 'user-001',
  name: 'Demo User',
};

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export type LoginValidation = z.infer<typeof loginSchema>;

export function validateLoginCredentials(credentials: LoginCredentials): { 
  success: boolean; 
  errors?: { email?: string; password?: string };
} {
  const result = loginSchema.safeParse(credentials);
  
  if (!result.success) {
    const errors: { email?: string; password?: string } = {};
    const errorMap = result.error.flatten().fieldErrors;
    
    if (errorMap.email) {
      errors.email = errorMap.email[0];
    }
    if (errorMap.password) {
      errors.password = errorMap.password[0];
    }
    
    return { success: false, errors };
  }
  
  return { success: true };
}

export function authenticateUser(email: string, password: string): { 
  success: boolean; 
  user?: User; 
  error?: string;
} {
  if (email !== HARDCODED_USER.email) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  if (password !== HARDCODED_USER.password) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  const user: User = {
    id: HARDCODED_USER.id,
    email: HARDCODED_USER.email,
    name: HARDCODED_USER.name,
  };
  
  return { success: true, user };
}

export function generateMockJWT(user: User): string {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 24 * 60 * 60;
  
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    iat: now,
    exp: exp,
  };
  
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature-' + user.id + '-' + now);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string): boolean {
  const payload = decodeJWT(token);
  if (!payload) return false;
  
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
}

export { AUTH_STORAGE_KEY, USER_STORAGE_KEY };
