import { Schema, model } from "mongoose";
import { User } from "./User";
import { Server } from "./Server";

interface Claim {
  user: User;
  server: Server;
  date: Date;
}

const ClaimSchema = new Schema<Claim>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user."],
  },

  server: {
    type: Schema.Types.ObjectId,
    ref: "Server",
    required: [true, "Please provide a server."],
  },

  date: {
    type: Date,
    required: [true, "Please provide a date."],
    default: Date.now(),
  },
});

export default model("Claim", ClaimSchema);
