/* eslint-disable linebreak-style */
const { OpenMusicPayloadSchema } = require('./schema');

const OpenMusicValidator = {
  validateMusicDataPayload: (payload) => {
    const validationResult = OpenMusicPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = OpenMusicValidator;
