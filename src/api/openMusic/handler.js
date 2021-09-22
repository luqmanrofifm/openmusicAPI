/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class MusicHandler {
  Constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    if (typeof this._service === 'undefined') {
      console.log('SERVICE MASIH KOSONG BROOOOO');
    }

    if (typeof this._validator === 'undefined') {
      console.log('VALIDATOR SAMA AJA KOSONG WKKWKWK');
    }
    this.postMusicDataHandler = this.postMusicDataHandler.bind(this);
    this.getMusicDataHandler = this.getMusicDataHandler.bind(this);
    this.getMusicDataByIdHandler = this.getMusicDataByIdHandler.bind(this);
    this.putMusicDataByIdHandler = this.putMusicDataByIdHandler.bind(this);
    this.deleteMusicDataByIdHandler = this.deleteMusicDataByIdHandler.bind(this);
  }

  async postMusicDataHandler(request, h) {
    try {
      this._validator.validateMusicDataPayload(request.payload);
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
    const musicData = await this._service.getMusicData();
    return {
      status: 'success',
      data: {
        musicData,
      },
    };
  }

  async getMusicDataByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const musicData = await this._service.getMusicDataById(id);
      return {
        status: 'success',
        data: {
          musicData,
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
      this._validator.validateMusicDataPayload(request.payload);
      const { id } = request.params;
      await this._service.editMusicDataById(id, request.payload);
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
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
      const { id } = request.params;
      await this._service.deleteMusicDataById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
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
