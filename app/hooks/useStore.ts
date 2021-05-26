import create from "zustand";
import { persist } from "zustand/middleware";

interface State {
  name: string;
  setName(name: string): void;
  beWarned: boolean;
  setBeWarned(beWarned: boolean): void;
}

const useStore = create<State>(
  persist(
    (set) => ({
      name: "",
      setName: (name: string) => set(() => ({ name })),
      beWarned: true,
      setBeWarned: (beWarned: boolean) => set(() => ({ beWarned })),
    }),
    {
      name: "app-storage",
    }
  )
);

export default useStore;
