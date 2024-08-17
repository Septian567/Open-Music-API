class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songData = {
      title: request.payload.title || 'untitled',
      year: request.payload.year,
      genre: request.payload.genre,
      performer: request.payload.performer,
      duration: request.payload.duration,
      albumId: request.payload.albumId,
    };

    const songId = await this._service.addSong(songData);

    return this._createResponse(h, 201, 'Lagu berhasil ditambahkan', {
      songId,
    });
  }

  async getSongsHandler(request, h) {
    const { title = '', performer = '' } = request.query;
    this._validator.validateSongQuery({ title, performer });

    const songs = title || performer
      ? await this._service.getSongs(title, performer)
      : await this._service.getSongs();

    return this._createResponse(h, 200, '', { songs });
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return this._createResponse(h, 200, '', { song });
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    await this._service.editSongById(id, request.payload);
    return this._createResponse(h, 200, 'Lagu berhasil diperbarui');
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    return this._createResponse(h, 200, 'Lagu berhasil dihapus');
  }

  // eslint-disable-next-line class-methods-use-this
  _createResponse(h, statusCode, message = '', data = {}) {
    const responsePayload = {
      status: 'success',
      message,
    };

    // Hanya tambahkan data jika tidak kosong
    if (Object.keys(data).length > 0) {
      responsePayload.data = data;
    }

    const response = h.response(responsePayload);
    response.code(statusCode);
    return response;
  }
}

module.exports = SongsHandler;
