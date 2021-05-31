import { Schema, model, models, Model } from "mongoose";
import { Thing } from "./types";

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
    claim: {
      type: Schema.Types.ObjectId,
      ref: "Claim",
    },
  },
  {
    timestamps: true,
  }
);

ThingSchema.pre("find", function () {
  // return related claim, instead of id
  this.populate("claim");
});

const getModel = () => model("Thing", ThingSchema);

// exporting one or the other due to hot-reloading
// which is re-initializing identical models
export default (models.Thing || getModel()) as ReturnType<typeof getModel>;
