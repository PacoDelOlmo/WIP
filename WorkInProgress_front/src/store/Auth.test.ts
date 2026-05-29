import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './Auth';

describe('Autenticación Global (Zustand)', () => {
  beforeEach(() => {
    useAuthStore.setState({ idUsuario: -1, isLoggedIn: false });
  });

  it('Debe iniciar con el usuario deslogueado por defecto', () => {
    const estado = useAuthStore.getState();
    expect(estado.isLoggedIn).toBe(false);
    expect(estado.idUsuario).toBe(-1);
  });

  it('Debe actualizar el estado al hacer login', () => {
    const mockUser = { id: 1, nombre: 'Paco', correo: 'paco@test.com' };

    useAuthStore.getState().login(mockUser.id); 

    const estadoActualizado = useAuthStore.getState();
    expect(estadoActualizado.isLoggedIn).toBe(true);
    expect(estadoActualizado.idUsuario).toBe(1);
  });
});