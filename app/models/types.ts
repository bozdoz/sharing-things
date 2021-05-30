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

export interface Thing extends BaseModel {
  title: string;
  message?: string;
  /** current claim */
  claim?: Claim | Claim["_id"];
}

/** record of claims */
export interface Claim extends BaseModel {
  user: User | User["_id"];
  thing: Thing | Thing["_id"];
}
