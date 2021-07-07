import { Request, Response } from "express";
import { User } from "../../../core/data/database/entities/User";

export default class AuthController {
  public async store(request: Request, response: Response) {
    const { email } = request.params;
    const { password } = request.body;

    try {
      const user = await User.findOne({
        where: { email, password }
      });

      if (!user) {
        return response.status(400).json({
          success: false,
          message: 'Usuário ou senha incorretos!',
        });
      }

      return response.status(200).json({
        success: true,
        data: user,
        message: 'Usuário encontrado, você será redirecionado para o sistema de recados!',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao buscar o usuário',
      });
    }
  }
}