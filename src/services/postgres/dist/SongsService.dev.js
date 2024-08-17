"use strict";

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
    mapDBSongsToModel = _require3.mapDBSongsToModel,
    mapDBSongsToModelDetail = _require3.mapDBSongsToModelDetail;

var SongsService =
/*#__PURE__*/
function () {
  function SongsService() {
    _classCallCheck(this, SongsService);

    this._pool = new Pool();
  }

  _createClass(SongsService, [{
    key: "addSong",
    value: function addSong(_ref) {
      var title, year, performer, genre, duration, albumId, id, insertedAt, updatedAt, query, result;
      return regeneratorRuntime.async(function addSong$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = _ref.title, year = _ref.year, performer = _ref.performer, genre = _ref.genre, duration = _ref.duration, albumId = _ref.albumId;
              id = "song-".concat(nanoid(16));
              insertedAt = new Date().toISOString();
              updatedAt = insertedAt;
              query = {
                text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
                values: [id, title, year, genre, performer, duration, albumId, insertedAt, updatedAt]
              };
              _context.next = 7;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 7:
              result = _context.sent;

              if (result.rows[0].id) {
                _context.next = 10;
                break;
              }

              throw new InvariantError('Lagu gagal ditambahkan');

            case 10:
              return _context.abrupt("return", result.rows[0].id);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSongs",
    value: function getSongs(title, performer) {
      var baseQuery, values, conditions, query, songs;
      return regeneratorRuntime.async(function getSongs$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              baseQuery = 'SELECT * FROM songs';
              values = [];
              conditions = [];

              if (title) {
                conditions.push("title ILIKE $".concat(conditions.length + 1));
                values.push("%".concat(title, "%"));
              }

              if (performer) {
                conditions.push("performer ILIKE $".concat(conditions.length + 1));
                values.push("%".concat(performer, "%"));
              }

              if (conditions.length > 0) {
                baseQuery += " WHERE ".concat(conditions.join(' AND '));
              }

              query = {
                text: baseQuery,
                values: values
              };
              _context2.next = 9;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 9:
              songs = _context2.sent;
              return _context2.abrupt("return", songs.rows.map(mapDBSongsToModel));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getSongById",
    value: function getSongById(id) {
      var query, song;
      return regeneratorRuntime.async(function getSongById$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = {
                text: 'SELECT * FROM songs WHERE id = $1',
                values: [id]
              };
              _context3.next = 3;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 3:
              song = _context3.sent;

              if (song.rowCount) {
                _context3.next = 6;
                break;
              }

              throw new NotFoundError('Lagu tidak ditemukan');

            case 6:
              return _context3.abrupt("return", mapDBSongsToModelDetail(song.rows[0]));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "editSongById",
    value: function editSongById(id, _ref2) {
      var title, year, performer, genre, duration, updatedAt, query, result;
      return regeneratorRuntime.async(function editSongById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              title = _ref2.title, year = _ref2.year, performer = _ref2.performer, genre = _ref2.genre, duration = _ref2.duration;
              updatedAt = new Date().toISOString();
              query = {
                text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
                values: [title, year, genre, performer, duration, updatedAt, id]
              };
              _context4.next = 5;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 5:
              result = _context4.sent;

              if (result.rows.length) {
                _context4.next = 8;
                break;
              }

              throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteSongById",
    value: function deleteSongById(id) {
      var query, result;
      return regeneratorRuntime.async(function deleteSongById$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              query = {
                text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
                values: [id]
              };
              _context5.next = 3;
              return regeneratorRuntime.awrap(this._pool.query(query));

            case 3:
              result = _context5.sent;

              if (result.rows.length) {
                _context5.next = 6;
                break;
              }

              throw new NotFoundError('Gagal menghapus lagu. Id tidak ditemukan');

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return SongsService;
}();

module.exports = SongsService;