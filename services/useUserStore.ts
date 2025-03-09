import { create } from "zustand";
import { User } from "./schemas/User";

interface UserState {
  name: string;
  setUser: (name: string) => void;
}
export const useUserStore = create<UserState>((set) => ({
  name: '',
  setUser: (name) => set({ name }),
}));
