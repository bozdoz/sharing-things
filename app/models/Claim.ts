import { Schema, model, models, Model } from "mongoose";
import { User } from "./User";
import { Thing } from "./Thing";
import { BaseModel } from "./BaseModel";

export interface Claim extends BaseModel {
  user: User;
  thing: Thing;
}

const ClaimSchema = new Schema<Claim, Model<Claim>>(
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

const getModel = () => model("Claim", ClaimSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Claim || getModel()) as ReturnType<typeof getModel>;
