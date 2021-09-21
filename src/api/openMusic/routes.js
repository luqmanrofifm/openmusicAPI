/* eslint-disable linebreak-style */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postMusicDataHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getMusicDataHandler,
  },
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: handler.getMusicDataByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: handler.putMusicDataByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: handler.deleteNoteByIdHandler,
  },
];

module.exports = routes;
