const Joi = require('joi');

// Fungsi untuk membuat pesan error kustom
const createMessages = (fieldName, customMessages = {}) => ({
  'string.base': `${fieldName} harus berupa string`,
  'string.empty': `${fieldName} harus diisi`,
  'any.required': `${fieldName} harus diisi`,
  'number.base': `${fieldName} harus berupa angka`,
  'number.integer': `${fieldName} harus berupa angka bulat`,
  'number.min': `${fieldName} minimal 1900`,
  'number.max': `${fieldName} maksimal 2030`,
  ...customMessages,
});

// Schema untuk payload lagu
const SongPayloadSchema = Joi.object({
  title: Joi.string().required().messages(createMessages('Judul lagu')),
  year: Joi.number().integer()
    .min(1900)
    .max(2030)
    .required()
    .messages(createMessages('Tahun lagu', {
      'number.base': 'Tahun lagu harus berupa angka',
      'number.integer': 'Tahun lagu harus berupa angka bulat',
      'number.min': 'Tahun lagu minimal 1900',
      'number.max': 'Tahun lagu maksimal 2030',
    })),
  genre: Joi.string().required().messages(createMessages('Genre lagu')),
  performer: Joi.string().required().messages(createMessages('Penampil lagu')),
  duration: Joi.number().integer().messages(createMessages('Durasi lagu', {
    'number.base': 'Durasi lagu harus berupa angka',
    'number.integer': 'Durasi lagu harus berupa angka bulat',
  })),
  albumId: Joi.string().messages(createMessages('ID album')),
});

// Schema untuk query lagu
const SongQuerySchema = Joi.object({
  title: Joi.string().allow(null, '').messages(createMessages('Judul lagu')),
  performer: Joi.string().allow(null, '').messages(createMessages('Penampil lagu')),
});

module.exports = { SongPayloadSchema, SongQuerySchema };
