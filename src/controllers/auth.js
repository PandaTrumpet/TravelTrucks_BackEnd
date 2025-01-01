import createHttpError from "http-errors";
import { ONE_DAY } from "../constans/index.js";
import {
  loginOrSignupWithGoogle,
  loginUser,
  logoutUser,
  registerUser,
  requestResetToken,
  resetPassword,
} from "../services/auth.js";
import { userInformation } from "../services/user.js";
import { refreshUserSession } from "../services/auth.js";
import { generateAuthUrl } from "../utils/googleOAuth2.js";

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully registered a new user",
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);
  const userId = session.userId.toString();

  const userData = await userInformation(userId); // console.log(session);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: { accessToken: session.accessToken, userData },
  });
};

export const logoutUserController = async (req, res, next) => {
  if (!req.cookies.sessionId) {
    throw createHttpError(401, "Session not found!");
  }

  await logoutUser(req.cookies.sessionId);

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");
  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};
export const refreshUserSessionController = async (req, res, next) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found!");
  }
  setupSession(res, session);
  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res, next) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: "Reset password email was successfully sent!",
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: "Password was successfully reset!",
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: "Successfully generated google oauth url!",
    data: { url },
  });
};
export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);
  res.json({
    status: 200,
    message: "Successfully logged in via Google OAuth!",
    data: {
      accessToken: session.accessToken,
    },
  });
};
