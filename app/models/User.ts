import { Schema, model, models, Model } from "mongoose";

export interface User {
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User, Model<User>>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const getModel = () => model("User", UserSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.User || getModel()) as ReturnType<typeof getModel>;
