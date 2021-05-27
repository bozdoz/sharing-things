import { Schema, model, models, Model } from "mongoose";
import { User } from "./User";
import { Server } from "./Server";

interface Claim {
  user: User;
  server: Server;
  createdAt: Date;
  updatedAt: Date;
}

const ClaimSchema = new Schema<Claim, Model<Claim>>(
  {
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
  },
  {
    timestamps: true,
  }
);

const getModel = () => model("Claim", ClaimSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Claim || getModel()) as ReturnType<typeof getModel>;
