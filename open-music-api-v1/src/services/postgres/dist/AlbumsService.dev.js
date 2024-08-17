"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('nanoid'),
    nanoid = _require.nanoid;

var _require2 = require('pg'),
    Pool = _require2.Pool;

var InvariantError = require('../../exceptions/InvariantError');

var NotFoundError = require('../../exceptions/NotFoundError');

var _require3 = require('../../utils'),
    mapDBAlbumsToModel = _require3.mapDBAlbumsToModel;

var AlbumsService =
/*#__PURE__*/
function () {
  function AlbumsService() {
    _classCallCheck(this, AlbumsService);

    this._pool = new Pool();
  }

  _createClass(AlbumsService, [{
    key: "addAlbum",
    value: function addAlbum(_ref) {
      var name, year, id, insertedAt, query, result;
      return regeneratorRuntime.async(function addAlbum$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = _ref.name, year = _ref.year;
              id = "album-".concat(nanoid(16));
              insertedAt = new Date().toISOString();
              query = {
                text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $4) RETURNING id',
                values: [id, name, year, insertedAt]
              };
              _context.next = 6;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 6:
              result = _context.sent;

              if (result.rows[0].id) {
                _context.next = 9;
                break;
              }

              throw new InvariantError('Album gagal ditambahkan');

            case 9:
              return _context.abrupt("return", result.rows[0].id);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getAlbumById",
    value: function getAlbumById(id) {
      var query, album, querySongs, songs, transformedAlbum;
      return regeneratorRuntime.async(function getAlbumById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              query = {
                text: 'SELECT * FROM albums WHERE id = $1',
                values: [id]
              };
              _context2.next = 3;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 3:
              album = _context2.sent;

              if (album.rows.length) {
                _context2.next = 6;
                break;
              }

              throw new NotFoundError('Album tidak ditemukan');

            case 6:
              querySongs = {
                text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
                values: [id]
              };
              _context2.next = 9;
              return regeneratorRuntime.awrap(this._pool.query(querySongs));

            case 9:
              songs = _context2.sent;
              transformedAlbum = mapDBAlbumsToModel(_objectSpread({}, album.rows[0], {
                songs: songs.rows
              }));
              return _context2.abrupt("return", transformedAlbum);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editAlbumById",
    value: function editAlbumById(id, _ref2) {
      var name, year, updatedAt, query, result;
      return regeneratorRuntime.async(function editAlbumById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              name = _ref2.name, year = _ref2.year;
              updatedAt = new Date().toISOString();
              query = {
                text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
                values: [name, year, updatedAt, id]
              };
              _context3.next = 5;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 5:
              result = _context3.sent;

              if (result.rows.length) {
                _context3.next = 8;
                break;
              }

              throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteAlbumById",
    value: function deleteAlbumById(id) {
      var query, result;
      return regeneratorRuntime.async(function deleteAlbumById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = {
                text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
                values: [id]
              };
              _context4.next = 3;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 3:
              result = _context4.sent;

              if (result.rows.length) {
                _context4.next = 6;
                break;
              }

              throw new NotFoundError('Gagal menghapus album. Id tidak ditemukan');

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return AlbumsService;
}();

module.exports = AlbumsService;