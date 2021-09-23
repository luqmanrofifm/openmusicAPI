/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class MusicHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postMusicDataHandler = this.postMusicDataHandler.bind(this);
    this.getMusicDataHandler = this.getMusicDataHandler.bind(this);
    this.getMusicDataByIdHandler = this.getMusicDataByIdHandler.bind(this);
    this.putMusicDataByIdHandler = this.putMusicDataByIdHandler.bind(this);
    this.deleteMusicDataByIdHandler = this.deleteMusicDataByIdHandler.bind(this);
  }

  async postMusicDataHandler(request, h) {
    try {
      try {
        this._validator.validateMusicDataPayload(request.payload);
      } catch (error) {
        const response = h.response({
          status: 'fail',
          message: 'Maaf, request tidak sesuai.',
        });
        response.code(400);
        return response;
      }
      const {
        title, year, performer, genre, duration,
      } = request.payload;
      const songId = await this._service.addMusic({
        title, year, performer, genre, duration,
      });
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getMusicDataHandler() {
    const songs = await this._service.getMusicData();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getMusicDataByIdHandler(request, h) {
    try {
      const { songId } = request.params;
      const song = await this._service.getMusicDataById(songId);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async putMusicDataByIdHandler(request, h) {
    try {
      try {
        this._validator.validateMusicDataPayload(request.payload);
      } catch (error) {
        const response = h.response({
          status: 'fail',
          message: 'Maaf, request tidak sesuai.',
        });
        response.code(400);
        return response;
      }
      const { songId } = request.params;
      await this._service.editMusicDataById(songId, request.payload);
      return {
        status: 'success',
        message: 'lagu berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteMusicDataByIdHandler(request, h) {
    try {
      const { songId } = request.params;
      await this._service.deleteMusicDataById(songId);
      return {
        status: 'success',
        message: 'lagu berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = MusicHandler;
