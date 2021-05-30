import { Schema, model, models, Model } from "mongoose";
import { BaseModel } from "./BaseModel";
import { User } from "./User";

export interface Thing extends BaseModel {
  title: string;
  message?: string;
  user?: User | User["_id"];
}

const ThingSchema = new Schema<Thing, Model<Thing>>(
  {
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
  },
  {
    timestamps: true,
  }
);

const getModel = () => model("Thing", ThingSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Thing || getModel()) as ReturnType<typeof getModel>;
