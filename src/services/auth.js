import createHttpError from "http-errors";
import { UserCollection } from "../db/models/users.js";

import { randomBytes } from "crypto";
import { SessionCollection } from "../db/models/session.js";
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

const createSession = (userId) => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");
  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  // console.log(session);

  if (!session) {
    throw createHttpError(401, "Session not found!");
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, "Session token expired!");
  }

  const newSession = createSession(session.userId);
  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });
  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
