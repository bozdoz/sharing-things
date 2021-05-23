declare namespace NodeJS {
  type Mongoose = typeof import("mongoose");
  export interface Global {
    mongoose: {
      conn: null | Mongoose;
      promise: null | Promise<Mongoose>;
    };
  }
}
