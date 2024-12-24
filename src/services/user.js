import createHttpError from "http-errors";
import { UserCollection } from "../db/models/users.js";
export const userInformation = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(401, "User not found!");
  }
  return user;
};
export const updateUser = async (userId, payload, options = {}) => {
  const userInfo = await UserCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    { new: true, includeResultMetadata: true, ...options }
  );
  if (!userInfo || !userInfo.value) return null;
  return {
    user: userInfo.value,
    isNew: userInfo?.lastErrorObject?.userted,
  };
};
export const allUsers = async () => {
  const allUser = await UserCollection.find();

  return allUser;
};
