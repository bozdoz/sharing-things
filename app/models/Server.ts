import { Schema, model } from "mongoose";
import { User } from "./User";

export interface Server {
  title: string;
  message?: string;
  user?: User;
}

const ServerSchema = new Schema<Server>({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    maxlength: [50, "Title cannot be more than 50 characters"],
  },
  message: {
    type: String,
    maxlength: [500, "Message cannot be more than 500 characters"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default model("Server", ServerSchema);
