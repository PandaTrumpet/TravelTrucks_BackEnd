import { model, Schema } from "mongoose";

const watersSchema = new Schema(
  {
    date: {
      type: String,
      // required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const WatersCollection = model("water", watersSchema);
