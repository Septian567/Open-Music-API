const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Nama album harus berupa string',
    'string.empty': 'Nama album harus diisi',
    'any.required': 'Nama album harus diisi',
  }),
  year: Joi.number().integer().min(1900).max(2030)
    .required()
    .messages({
      'number.base': 'Tahun album harus berupa angka',
      'number.integer': 'Tahun album harus berupa angka bulat',
      'number.min': 'Tahun album minimal 1900',
      'number.max': 'Tahun album maksimal 2030',
      'any.required': 'Tahun album harus diisi',
    }),
});
module.exports = {
  AlbumPayloadSchema,
};
