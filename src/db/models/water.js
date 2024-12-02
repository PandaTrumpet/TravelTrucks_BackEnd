import { model, Schema } from "mongoose";

const watersSchema = new Schema(
  {
    date: {
      type: Date,
      // required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      // required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const WatersCollection = model("water", watersSchema);
