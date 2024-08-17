"use strict";

var routes = function routes(_handler) {
  return [{
    method: 'POST',
    path: '/albums',
    handler: function handler(request, h) {
      return _handler.postAlbumHandler(request, h);
    }
  }, {
    method: 'GET',
    path: '/albums',
    handler: function handler(request, h) {
      return _handler.getAlbumsHandler(request, h);
    }
  }, {
    method: 'GET',
    path: '/albums/{id}',
    handler: function handler(request, h) {
      return _handler.getAlbumByIdHandler(request, h);
    }
  }, {
    method: 'PUT',
    path: '/albums/{id}',
    handler: function handler(request, h) {
      return _handler.putAlbumByIdHandler(request, h);
    }
  }, {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: function handler(request, h) {
      return _handler.deleteAlbumByIdHandler(request, h);
    }
  }];
};

module.exports = routes;