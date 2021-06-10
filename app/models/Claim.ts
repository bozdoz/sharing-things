import { Schema, model, models } from "mongoose";
import { Claim } from "./types";

const ClaimSchema = new Schema<Claim>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user."],
    },

    thing: {
      type: Schema.Types.ObjectId,
      ref: "Thing",
      required: [true, "Please provide a thing."],
    },
  },
  {
    timestamps: true,
  }
);

// TODO: define pre 'remove' hooks

const getModel = () => model("Claim", ClaimSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Claim || getModel()) as ReturnType<typeof getModel>;
