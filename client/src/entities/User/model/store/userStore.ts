import { create } from 'zustand/react';
import { UserModel } from '../types/UserModel';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/constants/localstorage';

const userStore = create<UserModel>((set) => ({
  _inited: false,

  initData: () => {
    const data = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (!data) {
      return;
    }
    const parsedData = JSON.parse(data);
    set({ ...parsedData });
  },

  setData: ({ id, email }) => {
    set({ id, email });
  },
}));

export const getUserId = () => userStore((state) => state.id || null);
export const getUserEmail = () => userStore((state) => state.email || null);
export const getUserInitData = () => userStore((state) => state.initData);
export const getUserSetDataHook = () => userStore((state) => state.setData);
export const getUserSetData = () => userStore.getState().setData;
