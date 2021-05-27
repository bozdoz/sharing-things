import { Schema, model, models, Model } from "mongoose";
import { User } from "./User";

export interface Server {
  title: string;
  message?: string;
  user?: User;

  createdAt: Date;
  updatedAt: Date;
}

const ServerSchema = new Schema<Server, Model<Server>>(
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

const getModel = () => model("Server", ServerSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Server || getModel()) as ReturnType<typeof getModel>;
