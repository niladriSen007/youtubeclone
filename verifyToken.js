// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzQyMzViMzk3ZTk4ZjA1ZGNmMTJmMiIsImlhdCI6MTY3MzgxNTE5M30.fptSBmWGqLj4Pu03zm4pKpvlzrPOrxICDsuiGjPd8Qc

import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next()
  });
};