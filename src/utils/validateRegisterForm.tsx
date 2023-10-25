import { RegisterReq } from '../types/Auth';

export default function validateRegisterForm(data: RegisterReq) {
  const errors: Map<string, string> = new Map();

  if (data.firstName.length < 3) {
    errors.set('firstName', 'Nombre debería tener más de 3 caracteres');
  }
  if (data.lastName.length < 3) {
    errors.set('lastName', 'Apellido debería tener más de 3 caracteres');
  }

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.set('email', 'Email es inválido');
  }

  if (data.password.length < 6) {
    errors.set('password', 'Password debe tener 6 o más caracteres');
  }
}
