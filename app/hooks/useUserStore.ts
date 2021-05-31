import create from "zustand";
import { persist } from "zustand/middleware";
import { debounce } from "throttle-debounce";
import { userResource } from "resources";

export interface State {
  name: string;
  setName(name: string): void;
  beWarned: boolean;
  setBeWarned(beWarned: boolean): void;
  userId: string | null;
  setUserId(userId: string): void;
}

const debouncedCreateUser = debounce(800, userResource.create);
const debouncedUpdateUser = debounce(800, userResource.update);

const useUserStore = create<State>(
  persist(
    (set, get) => ({
      name: "",
      setName: async (name: string) => {
        set(() => ({ name }));

        const { userId } = get();

        if (userId) {
          await debouncedUpdateUser(userId, {
            name,
          });
        } else {
          const { _id: userId } = await debouncedCreateUser({
            name,
          });
          set(() => ({ userId }));
        }
      },
      beWarned: true,
      setBeWarned: (beWarned: boolean) => set(() => ({ beWarned })),
      userId: null,
      setUserId: (userId: string) => set(() => ({ userId })),
    }),
    {
      name: "app-storage",
    }
  )
);

export default useUserStore;
