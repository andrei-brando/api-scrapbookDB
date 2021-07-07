import { NextFunction, Request, Response } from "express";
import { User } from "../../../core/data/database/entities/User";

export default async (request: Request, response: Response, next: NextFunction) => {
  const { email } = request.body;

  const checkUserAlreadyExists = await User.findOne({
    where: { email },
  });  

  if (checkUserAlreadyExists) {
    return response.status(400).json({
      success: false,
      message: "Usuário já cadastrado com este e-mail!",
    });
  }

  return next();
}