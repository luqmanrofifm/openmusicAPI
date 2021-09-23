/* eslint-disable linebreak-style */
const { MusicPayloadSchema } = require('./schema');

const OpenMusicValidator = {
  validateMusicDataPayload: (payload) => {
    const validationResult = MusicPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = OpenMusicValidator;
