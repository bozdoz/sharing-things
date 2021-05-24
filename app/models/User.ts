import { Schema, model } from "mongoose";

export interface User {
  name: string;
  active: boolean;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  active: Boolean,
});

export default model("User", UserSchema);
