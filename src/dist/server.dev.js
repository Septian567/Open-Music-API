require('dotenv').config();

const Hapi = require('@hapi/hapi');

const songs = require('./api/songs');

const albums = require('./api/albums');

const SongsService = require('./services/postgres/SongsService');

const AlbumsService = require('./services/postgres/AlbumsService');

const SongsValidator = require('./validator/songs');

const AlbumsValidator = require('./validator/albums');

const ClientError = require('./exceptions/ClientError');

const init = function init() {
  let songsService; let albumsService; let
    server;
  return regeneratorRuntime.async((_context) => {
    while (1) {
      switch (_context.prev = _context.next) {
      case 0:
        songsService = new SongsService();
        albumsService = new AlbumsService();
        server = Hapi.server({
          port: process.env.PORT,
          host: process.env.HOST,
          routes: {
            cors: {
              origin: ['*'],
            },
          },
        });
        _context.next = 5;
        return regeneratorRuntime.awrap(server.register([{
          plugin: songs,
          options: {
            service: songsService,
            validator: SongsValidator,
          },
        }, {
          plugin: albums,
          options: {
            service: albumsService,
            validator: AlbumsValidator,
          },
        }]));

      case 5:
        server.ext('onPreResponse', (request, h) => {
          const { response } = request;

          if (response instanceof Error) {
            if (response instanceof ClientError) {
              const _newResponse = h.response({
                status: 'fail',
                message: response.message,
              });

              _newResponse.code(response.statusCode);

              return _newResponse;
            }

            if (!response.isServer) {
              return h.continue;
            }

            const newResponse = h.response({
              status: 'error',
              message: 'terjadi kegagalan pada server kami',
            });
            console.log('Error: '.concat(response.message));
            newResponse.code(500);
            return newResponse;
          }

          return h.continue;
        });
        _context.next = 8;
        return regeneratorRuntime.awrap(server.start());

      case 8:
        console.log('Server berjalan pada '.concat(server.info.uri));

      case 9:
      case 'end':
        return _context.stop();
      }
    }
  });
};

init();
