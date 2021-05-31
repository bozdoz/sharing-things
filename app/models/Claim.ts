import { Schema, model, models, Model } from "mongoose";
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

ClaimSchema.pre("find", function () {
  // return related user, instead of id
  this.populate("user");
});

const getModel = () => model("Claim", ClaimSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Claim || getModel()) as ReturnType<typeof getModel>;
