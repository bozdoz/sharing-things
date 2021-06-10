export interface BaseModel {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly _id: string;
  readonly __v: string;
}

export interface User extends BaseModel {
  name: string;
}

export interface Thing<Updating = false> extends BaseModel {
  title: string;
  message?: string;
  /** current claim */
  claimed?:
    | null
    | (Updating extends true ? string : Pick<Claim, "_id" | "createdAt">);
  /**
   * use routes to share things in multiple namespaces:
   * URL /path/is/your/namespace
   */
  namespace: string;
  claimedBy?: null | (Updating extends true ? string : User);
}

/** record of claims */
export interface Claim<Viewing = false> extends BaseModel {
  user: Viewing extends true ? string : User;
  thing: Viewing extends true ? string : Thing;
}
