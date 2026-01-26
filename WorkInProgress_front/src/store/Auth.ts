import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
    isLoggedIn: boolean,
    idUsuario: number,
    login: (id : number) => void,
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      idUsuario: -1,

      login: (id: number) => set({
          isLoggedIn: true,
          idUsuario: id
        }),
      logout: () => set({
        isLoggedIn: false,
        idUsuario: -1
      }),
    }),
    {
      name: 'auth-storage'
    }
  )
);
  
