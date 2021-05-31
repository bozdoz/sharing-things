export interface BaseModel {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly _id: string;
  readonly __v: string;
}

export interface User extends BaseModel {
  name: string;
  /**
   * whether user is on the page or not (default: true)
   * sets to false when user navigates away
   * sets to true when user revisits
   */
  active?: boolean;
}

export interface Thing<Updating = false> extends BaseModel {
  title: string;
  message?: string;
  /** current claim */
  claim?: null | (Updating extends true ? string : Claim);
}

/** record of claims */
export interface Claim<Viewing = false> extends BaseModel {
  user: Viewing extends true ? string : User;
  thing: Viewing extends true ? string : Thing;
}
