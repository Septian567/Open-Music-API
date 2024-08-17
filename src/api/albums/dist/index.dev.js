"use strict";

var AlbumsHandler = require('./handler');

var routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: function register(server, _ref) {
    var service, validator, albumsHandler;
    return regeneratorRuntime.async(function register$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            service = _ref.service, validator = _ref.validator;
            albumsHandler = new AlbumsHandler({
              service: service,
              validator: validator
            });
            server.route(routes(albumsHandler));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};