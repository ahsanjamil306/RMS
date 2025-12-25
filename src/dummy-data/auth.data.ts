import type { User, AuthResponse } from '@/types/auth.types';

export const dummyUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  fullName: 'John Doe',
  phone: '+1234567890',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  role: 'owner',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

export const dummyAuthResponse: AuthResponse = {
  user: dummyUser,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTYwOTQ1OTIwMCwiZXhwIjoxNjQwOTk1MjAwfQ.dummytoken',
};

export const mockLoginResponse = {
  Data: dummyAuthResponse,
  Success: true,
  ResponseMessage: 'Login successful',
};

export const mockSignupResponse = {
  Data: dummyAuthResponse,
  Success: true,
  ResponseMessage: 'Account created successfully',
};

export const mockForgotPasswordResponse = {
  Data: { message: 'Password reset email sent' },
  Success: true,
  ResponseMessage: 'Password reset email sent',
};

export const mockResetPasswordResponse = {
  Data: { message: 'Password reset successful' },
  Success: true,
  ResponseMessage: 'Password reset successful',
};
