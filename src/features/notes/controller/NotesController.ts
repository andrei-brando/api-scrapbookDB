import { Request, Response } from "express";
import { Note } from "../../../core/data/database/entities/Note";

export default class NotesController {
  public async index(request: Request, response: Response) {
    try {
      const notes = await Note.find();

      return response.status(200).json({
        success: true,
        data: notes,
        message: 'Recados encontrados!',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao buscar a lista de recados',
      });
    }
  }

  public async show(request: Request, response: Response) {
    const { uid } = request.params;

    try {
      const note = await Note.findOne(uid);

      if (!note) {
        return response.status(200).json({
          success: true,
          data: null,
          message: 'Não foi possível encontrar um recado com o id específico!',
        });
      }

      return response.status(200).json({
        success: true,
        data: note,
        message: 'Recados encontrado!',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao buscar o recado',
      });
    }
  }

  public async store(request: Request, response: Response) {
    const { description, details } = request.body;

    try {
      const note = await new Note(description, details).save();

      return response.status(200).json({
        success: true,
        data: note,
        message: 'Recado inserido com sucesso!',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao inserir o recado',
      });
    }
  }

  public async update(request: Request, response: Response) {
    const { uid } = request.params;
    const { description, details } = request.body;

    try {
      const newNote = await Note.findOne(uid);

      if (newNote) {
        newNote.description = description;
        newNote.details = details;
        await newNote.save();
      }

      return response.status(200).json({
        success: true,
        data: newNote,
        message: newNote ?
          'Dados atualizados com sucesso'
          : 'Nenhum recado encotrado para ser atualizado',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao atualizar o recado',
      });
    }
  }

  public async delete(request: Request, response: Response) {
    const { uid } = request.params;

    try {
      await Note.delete(uid);

      return response.status(200).json({
        success: true,
        message: 'Recado deletado com sucesso',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error: error.message ? error.message : error,
        message: 'Ocorreu um problema ao deletar o recado',
      });
    }
  }
}