import createHttpError from "http-errors";
import { UserCollection } from "../db/models/User.js";

import { randomBytes } from "crypto";
import { SessionCollection } from "../db/models/Session.js";
import { ONE_DAY, FIFTEEN_MINUTES } from "../constans/index.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, "Email in use!");
  }

  const encryptedPassword = await hashPassword(payload.password);
  return await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, "User not found!");
  }

  const isEqual = await comparePassword(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, "Password invalid!");
  }

  await SessionCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = SessionCollection.findOne({ _id: sessionId, refreshToken });
  if (!session) {
    throw createHttpError(401, "Session not found!");
  }
  const isSessionTokenExpired = new Date() > new Date(session.refreshToken);
  if (isSessionTokenExpired) {
    throw createHttpError(401, "Session token expired!");
  }
  const newSession = createSession();
  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });
  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

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
  const allUser = await UserCollection.countDocuments();

  return allUser;
};
