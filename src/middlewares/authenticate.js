import createHttpError from "http-errors";
import { SessionCollection } from "../db/models/session.js";
import { UserCollection } from "../db/models/users.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    next(createHttpError(401, "Please provide Authorization header!"));
    return;
  }
  const bearer = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];
  if (!bearer) {
    return next(createHttpError(401, "Token must have Bearer type"));
  }
  if (!token) {
    return createHttpError(401, "Token missing!");
  }
  const session = await SessionCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, "Session not found!"));
    return;
  }
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, "Access token expired!"));
    return;
  }

  const user = await UserCollection.findById(session.userId);
  if (!user) {
    next(createHttpError(401, "User not found!"));
    return;
  }

  req.user = user;

  next();
};
