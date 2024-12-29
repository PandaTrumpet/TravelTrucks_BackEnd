import { model, Schema } from "mongoose";
import { mongooseSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp } from "../../constans/user-constans.js";
const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    weight: {
      type: Number,
      // required: true,
      default: 0,
    },
    activeTime: {
      type: Number,
      default: 0,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
      // регулярное выражение для мейла
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      // required: true,
    },
    waterNorma: {
      type: Number,
      default: 1.5,
      // required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
  },
  { timestamps: true, versionKey: false }
);
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post("save", mongooseSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", mongooseSaveError);
export const UserCollection = model("users", userSchema);
