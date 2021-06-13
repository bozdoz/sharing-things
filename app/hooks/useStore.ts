import create, { SetState } from "zustand";
import { persist } from "zustand/middleware";
import { debounce } from "throttle-debounce";
import { userResource } from "resources";
import { User } from "models/types";

export interface State {
  name: string;
  setName(name: string): void;
  beWarned: boolean;
  setBeWarned(beWarned: boolean): void;
  userId: string | null;
}

// need to pass the state setter to the debounced function
// so that I can update state after resource is created
const debouncedCreateUser = debounce(
  800,
  async (set: SetState<State>, user: Writable<User>) => {
    const { _id: userId } = await userResource.create(user);

    // only sets userId after user created; otherwise, it's in localstorage
    set({ userId });
  }
);
const debouncedUpdateUser = debounce(800, userResource.update);

const useStore = create<State>(
  persist(
    (set, get) => ({
      name: "",
      setName: async (name: string) => {
        set(() => ({ name }));

        const { userId } = get();

        if (userId) {
          debouncedUpdateUser(userId, {
            name,
          });
        } else {
          debouncedCreateUser(set, {
            name,
          });
        }
      },
      beWarned: true,
      setBeWarned: (beWarned: boolean) => set(() => ({ beWarned })),
      userId: null,
    }),
    {
      name: "app-storage",
    }
  )
);

export default useStore;
