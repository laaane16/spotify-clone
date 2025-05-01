import { create } from 'zustand/react';
import { UserModel } from '../types/UserModel';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/constants/localstorage';
import { initUserData } from '../services/initUserData';

const userStore = create<UserModel>((set) => ({
  _inited: false,

  initData: async () => {
    const data = await initUserData();

    if (data instanceof Error) {
      return;
    }

    set({ ...data, _inited: true });
  },

  setData: ({ id, email }) => {
    set({ id, email, _inited: true });
  },
}));

export const getUserId = () => userStore((state) => state.id || null);
export const getUserEmail = () => userStore((state) => state.email || null);
export const getUserInited = () => userStore((state) => state._inited);

export const getUserInitData = () => userStore((state) => state.initData);
export const getUserSetDataHook = () => userStore((state) => state.setData);
export const getUserSetData = () => userStore.getState().setData;
