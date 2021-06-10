import { Schema, model, models, Model } from "mongoose";
import { Thing } from "./types";

const ThingSchema = new Schema<Thing<true>, Model<Thing<true>>, Thing>(
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
    claimed: {
      type: Schema.Types.ObjectId,
      ref: "Claim",
    },
    namespace: {
      type: String,
      default: "/",
      maxlength: [50, "Namespace cannot be more than 50 characters"],
    },
    claimedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

ThingSchema.pre("find", function () {
  // return related fields, instead of just id's
  this.populate("claimed", "createdAt").populate("claimedBy");
});

ThingSchema.pre("findOne", function () {
  // return related fields, instead of just id's
  this.populate("claimed", "createdAt").populate("claimedBy");
});

// TODO define pre 'remove' hooks

const getModel = () => model("Thing", ThingSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Thing || getModel()) as ReturnType<typeof getModel>;
