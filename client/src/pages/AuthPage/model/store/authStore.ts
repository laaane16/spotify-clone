import { create } from 'zustand';

import { AuthModel } from '../types/AuthModel';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';
import { registration } from '../services/registration/registration';

const authStore = create<AuthModel>((set, get) => ({
  isLoading: false,

  // actions
  loginByUsername: async (username, password) => {
    set({ error: undefined, isLoading: true });
    const data = await loginByUsername(username, password);

    if (data instanceof Error) {
      set({ error: data.message, isLoading: false });
      return get().error;
    }

    set({ isLoading: false });
    return get().error;
  },

  registration: async (username, password) => {
    set({ error: undefined, isLoading: true });
    const data = await registration(username, password);

    if (data instanceof Error) {
      set({ error: data.message, isLoading: false });
      return get().error;
    }

    set({ isLoading: false });
    return get().error;
  },
}));

export const getAuthIsLoading = () => authStore((state) => state.isLoading);
export const getAuthError = () => authStore((state) => state.error || '');
export const getAuthLoginByUsername = () => authStore((state) => state.loginByUsername);
export const getAuthRegistration = () => authStore((state) => state.registration);
