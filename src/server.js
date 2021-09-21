/* eslint-disable linebreak-style */
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const openMusic = require('./api/openMusic');
const MusicService = require('./services/postgres/MusicService');
const NotesValidator = require('./validator/notes');

const init = async () => {
  const musicService = new MusicService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: openMusic,
    options: {
      service: musicService,
      validator: NotesValidator,
    },
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
