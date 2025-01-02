import { usersAmount, updateUser, userInformation } from "../services/user.js";
import createHttpError from "http-errors";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { env } from "../utils/env.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
export const userInformationController = async (req, res, next) => {
  const { userId } = req.params;

  const user = await userInformation(userId);
  if (!user) {
    next(createHttpError(404, `User with id ${userId} not found`));
  }
  res.status(200).json({
    status: 200,
    message: "Successfully retrieved user information",
    data: user,
  });
};

export const upsertUserController = async (req, res, next) => {
  const { userId } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env("ENABLE_CLOUDINARY") === "true") {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateUser(
    userId,
    { ...req.body, avatar: photoUrl },
    { upsert: true }
  );
  if (!result) {
    next(createHttpError(404, "User not found."));
    return;
  }
  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a user with id ${userId}`,
    data: result,
  });
};
export const usersAmountController = async (req, res, next) => {
  const allUser = await usersAmount();

  res.status(200).json({
    status: 200,
    message: "Amount of all users",
    data: allUser.length,
  });
};
