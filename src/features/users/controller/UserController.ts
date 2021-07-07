import { Request, Response } from 'express';
import { User } from '../../../core/data/database/entities/User';

export default class UserController {
  public async index(request: Request, response: Response) {
    try {
      const user = await User.find();

      return response.status(200).json({
        success: true,
        data: user,
        message: 'Lista de usuários',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao buscar a lista de usuários',
      });
    }
  }

  // public async show(request: Request, response: Response) {
  //   const { email } = request.params;
  //   const { password } = request.body;

  //   try {
  //     const user = await User.findOne({
  //       where: { email, password }
  //     });

  //     if (!user) {
  //       return response.status(400).json({
  //         success: false,
  //         message: 'Usuário ou senha incorretos!',
  //       });
  //     }

  //     return response.status(200).json({
  //       success: true,
  //       data: user,
  //       message: 'Usuário encontrado',
  //     });
  //   } catch (error) {
  //     return response.status(500).json({
  //       success: false,
  //       error: error.message ? error.message : error,
  //       message: 'Ocorreu um problema ao buscar o usuário',
  //     });
  //   }
  // }

  public async store(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = new User(email, password).save();

      return response.status(200).json({
        success: true,
        data: user,
        message: 'Usuário cadastrado com sucesso',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao cadastrar o usuário',
      });
    }
  }

  public async update(request: Request, response: Response) {
    const { uid } = request.params;
    const { email, password } = request.body;

    try {
      const newUser = await User.findOne(uid);

      if (newUser) {
        newUser.email = email;
        newUser.password = password;
        await newUser.save();
      }

      return response.status(200).json({
        success: true,
        data: newUser,
        message: newUser ?
          'Dados atualizados com sucesso'
          : 'Nenhum usuário encotrado para ser atualizado',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao atualizar o usuário',
      });
    }
  }

  public async delete(request: Request, response: Response) {
    const { uid } = request.params;

    try {
      await User.delete(uid);

      return response.status(200).json({
        success: true,
        message: 'Usuário deletado com sucesso',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao deletar o usuário',
      });
    }
  }
}