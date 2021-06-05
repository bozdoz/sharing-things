import { User } from "models/types";
import userModel from "models/User";
import dbConnect from "./dbConnect";

/** server-side user update method */
const updateUser = async (id: string, data: Partial<User>) => {
  await dbConnect();

  console.log("update user", { id, data });

  return userModel.findByIdAndUpdate(id, data);
};

export default updateUser;
