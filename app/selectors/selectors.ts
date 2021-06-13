import { State } from "hooks/useStore";

export const userIdSelector = (state: State) => state.userId;
export const beWarnedSelector = (state: State) => state.beWarned;
export const nameEmptySelector = (state: State) => !state.name;
export const setBeWarnedSelector = (state: State) => state.setBeWarned;
