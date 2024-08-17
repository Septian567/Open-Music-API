"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SongsHandler =
/*#__PURE__*/
function () {
  function SongsHandler(service, validator) {
    _classCallCheck(this, SongsHandler);

    this._service = service;
    this._validator = validator;
  }

  _createClass(SongsHandler, [{
    key: "postSongHandler",
    value: function postSongHandler(request, h) {
      var songData, songId;
      return regeneratorRuntime.async(function postSongHandler$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this._validator.validateSongPayload(request.payload);

              songData = {
                title: request.payload.title || 'untitled',
                year: request.payload.year,
                genre: request.payload.genre,
                performer: request.payload.performer,
                duration: request.payload.duration,
                albumId: request.payload.albumId
              };
              _context.next = 4;
              return regeneratorRuntime.awrap(this._service.addSong(songData));

            case 4:
              songId = _context.sent;
              return _context.abrupt("return", this._createResponse(h, 201, 'Lagu berhasil ditambahkan', {
                songId: songId
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSongsHandler",
    value: function getSongsHandler(request, h) {
      var _request$query, _request$query$title, title, _request$query$perfor, performer, songs;

      return regeneratorRuntime.async(function getSongsHandler$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _request$query = request.query, _request$query$title = _request$query.title, title = _request$query$title === void 0 ? '' : _request$query$title, _request$query$perfor = _request$query.performer, performer = _request$query$perfor === void 0 ? '' : _request$query$perfor;

              this._validator.validateSongQuery({
                title: title,
                performer: performer
              });

              if (!(title || performer)) {
                _context2.next = 8;
                break;
              }

              _context2.next = 5;
              return regeneratorRuntime.awrap(this._service.getSongs(title, performer));

            case 5:
              _context2.t0 = _context2.sent;
              _context2.next = 11;
              break;

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(this._service.getSongs());

            case 10:
              _context2.t0 = _context2.sent;

            case 11:
              songs = _context2.t0;
              return _context2.abrupt("return", this._createResponse(h, 200, '', {
                songs: songs
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSongByIdHandler",
    value: function getSongByIdHandler(request, h) {
      var id, song;
      return regeneratorRuntime.async(function getSongByIdHandler$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = request.params.id;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this._service.getSongById(id));

            case 3:
              song = _context3.sent;
              return _context3.abrupt("return", this._createResponse(h, 200, '', {
                song: song
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "putSongByIdHandler",
    value: function putSongByIdHandler(request, h) {
      var id;
      return regeneratorRuntime.async(function putSongByIdHandler$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this._validator.validateSongPayload(request.payload);

              id = request.params.id;
              _context4.next = 4;
              return regeneratorRuntime.awrap(this._service.editSongById(id, request.payload));

            case 4:
              return _context4.abrupt("return", this._createResponse(h, 200, 'Lagu berhasil diperbarui'));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteSongByIdHandler",
    value: function deleteSongByIdHandler(request, h) {
      var id;
      return regeneratorRuntime.async(function deleteSongByIdHandler$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = request.params.id;
              _context5.next = 3;
              return regeneratorRuntime.awrap(this._service.deleteSongById(id));

            case 3:
              return _context5.abrupt("return", this._createResponse(h, 200, 'Lagu berhasil dihapus'));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "_createResponse",
    value: function _createResponse(h, statusCode) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var responsePayload = {
        status: 'success',
        message: message
      }; // Hanya tambahkan data jika tidak kosong

      if (Object.keys(data).length > 0) {
        responsePayload.data = data;
      }

      var response = h.response(responsePayload);
      response.code(statusCode);
      return response;
    }
  }]);

  return SongsHandler;
}();

module.exports = SongsHandler;