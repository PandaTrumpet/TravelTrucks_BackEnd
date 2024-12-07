import createHttpError from "http-errors";
import { ONE_DAY } from "../constans/index.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userInformation,
} from "../services/auth.js";
import { refreshUserSession } from "../services/auth.js";
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully registered a new user!",
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);
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
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
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
    sesionId: req.cookies.sesionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const userInformationController = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);

  const user = await userInformation(userId);
  res.status(200).json({
    status: 200,
    message: "User full information!",
    data: user,
  });
};

export const upsertUserController = async (req, res, next) => {
  const { userId } = req.params;
  const result = await updateUser(userId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, "User not found!"));
    return;
  }
  const status = result.isNew ? 201 : 200;
  console.log(status);
  res.status(status).json({
    status,
    message: `Successfully upserted a user with id ${userId}`,
    data: result,
  });
};
