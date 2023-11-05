import { LoginReq } from '../api/types/Auth';

export default function validateLoginForm(data: LoginReq): Map<string, string> {
  const errors: Map<string, string> = new Map();

  if (!data.email) {
    errors.set('email', 'Email is required');
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.set('email', 'Email address is invalid');
  }

  if (!data.password) {
    errors.set('password', 'Password is required');
  } else if (data.password.length < 6) {
    errors.set('password', 'Password must be 6 or more characters');
  }

  return errors;
}
