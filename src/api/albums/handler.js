class AlbumsHandler {
  constructor({ service, validator }) {
    this._service = service;
    this._validator = validator;

    // Binding this untuk memastikan handler tetap memiliki konteks yang benar
    this.postAlbumHandler = this._handlePostAlbum.bind(this);
    this.getAlbumByIdHandler = this._handleGetAlbumById.bind(this);
    this.putAlbumByIdHandler = this._handlePutAlbumById.bind(this);
    this.deleteAlbumByIdHandler = this._handleDeleteAlbumById.bind(this);
  }

  async _handlePostAlbum(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name = 'unnamed', year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    return this._createResponse(h, 201, 'Album berhasil ditambahkan', {
      albumId,
    });
  }

  async _handleGetAlbumById(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);

    return this._createResponse(h, 200, '', { album });
  }

  async _handlePutAlbumById(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return this._createResponse(h, 200, 'Album berhasil diperbarui');
  }

  async _handleDeleteAlbumById(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return this._createResponse(h, 200, 'Album berhasil dihapus');
  }

  // eslint-disable-next-line class-methods-use-this
  _createResponse(h, statusCode, message = '', data = {}) {
    const responsePayload = {
      status: 'success',
      message,
    };

    if (Object.keys(data).length > 0) {
      responsePayload.data = data;
    }

    const response = h.response(responsePayload);
    response.code(statusCode);
    return response;
  }
}

module.exports = AlbumsHandler;
