"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AlbumsHandler =
/*#__PURE__*/
function () {
  function AlbumsHandler(_ref) {
    var service = _ref.service,
        validator = _ref.validator;

    _classCallCheck(this, AlbumsHandler);

    this._service = service;
    this._validator = validator; // Binding this untuk memastikan handler tetap memiliki konteks yang benar

    this.postAlbumHandler = this._handlePostAlbum.bind(this);
    this.getAlbumByIdHandler = this._handleGetAlbumById.bind(this);
    this.putAlbumByIdHandler = this._handlePutAlbumById.bind(this);
    this.deleteAlbumByIdHandler = this._handleDeleteAlbumById.bind(this);
  }

  _createClass(AlbumsHandler, [{
    key: "_handlePostAlbum",
    value: function _handlePostAlbum(request, h) {
      var _request$payload, _request$payload$name, name, year, albumId;

      return regeneratorRuntime.async(function _handlePostAlbum$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this._validator.validateAlbumPayload(request.payload);

              _request$payload = request.payload, _request$payload$name = _request$payload.name, name = _request$payload$name === void 0 ? 'unnamed' : _request$payload$name, year = _request$payload.year;
              _context.next = 4;
              return regeneratorRuntime.awrap(this._service.addAlbum({
                name: name,
                year: year
              }));

            case 4:
              albumId = _context.sent;
              return _context.abrupt("return", this._createResponse(h, 201, 'Album berhasil ditambahkan', {
                albumId: albumId
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_handleGetAlbumById",
    value: function _handleGetAlbumById(request, h) {
      var id, album;
      return regeneratorRuntime.async(function _handleGetAlbumById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = request.params.id;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this._service.getAlbumById(id));

            case 3:
              album = _context2.sent;
              return _context2.abrupt("return", this._createResponse(h, 200, '', {
                album: album
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_handlePutAlbumById",
    value: function _handlePutAlbumById(request, h) {
      var id;
      return regeneratorRuntime.async(function _handlePutAlbumById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this._validator.validateAlbumPayload(request.payload);

              id = request.params.id;
              _context3.next = 4;
              return regeneratorRuntime.awrap(this._service.editAlbumById(id, request.payload));

            case 4:
              return _context3.abrupt("return", this._createResponse(h, 200, 'Album berhasil diperbarui'));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_handleDeleteAlbumById",
    value: function _handleDeleteAlbumById(request, h) {
      var id;
      return regeneratorRuntime.async(function _handleDeleteAlbumById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = request.params.id;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this._service.deleteAlbumById(id));

            case 3:
              return _context4.abrupt("return", this._createResponse(h, 200, 'Album berhasil dihapus'));

            case 4:
            case "end":
              return _context4.stop();
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
      };

      if (Object.keys(data).length > 0) {
        responsePayload.data = data;
      }

      var response = h.response(responsePayload);
      response.code(statusCode);
      return response;
    }
  }]);

  return AlbumsHandler;
}();

module.exports = AlbumsHandler;