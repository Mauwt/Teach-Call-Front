import { RegisterReq } from '../types/Auth';

export default function validateRegisterForm(
  data: RegisterReq
): Map<string, string> {
  const errors: Map<string, string> = new Map();

  if (data.firstName.length < 3) {
    errors.set('firstName', 'Nombre debería tener más de 3 caracteres');
  }
  if (!/^[a-zA-Z]+$/.test(data.firstName)) {
    errors.set('firstName', 'Nombre solo puede contener letras');
  }
  if (data.lastName.length < 3) {
    errors.set('lastName', 'Apellido debería tener más de 3 caracteres');
  }
  if (!/^[a-zA-Z]+$/.test(data.lastName)) {
    errors.set('lastName', 'Apellido solo puede contener letras');
  }

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.set('email', 'Email es inválido');
  }

  if (data.password.length < 6) {
    errors.set('password', 'Password debe tener 6 o más caracteres');
  }
  return errors;
}
