"use strict";

var Joi = require('joi'); // Fungsi untuk membuat pesan error kustom


var createMessages = function createMessages(fieldName) {
  return {
    'string.base': "".concat(fieldName, " harus berupa string"),
    'string.empty': "".concat(fieldName, " harus diisi"),
    'any.required': "".concat(fieldName, " harus diisi"),
    'number.base': "".concat(fieldName, " harus berupa angka"),
    'number.integer': "".concat(fieldName, " harus berupa angka bulat"),
    'number.min': "".concat(fieldName, " minimal 1900"),
    'number.max': "".concat(fieldName, " maksimal 2030")
  };
};

var SongPayloadSchema = Joi.object({
  title: Joi.string().required().messages(createMessages('Judul lagu')),
  year: Joi.number().integer().min(1900).max(2030).required().messages({
    'number.base': 'Tahun lagu harus berupa angka',
    'number.integer': 'Tahun lagu harus berupa angka bulat',
    'number.min': 'Tahun lagu minimal 1900',
    'number.max': 'Tahun lagu maksimal 2030',
    'any.required': 'Tahun lagu harus diisi'
  }),
  genre: Joi.string().required().messages(createMessages('Genre lagu')),
  performer: Joi.string().required().messages(createMessages('Penampil lagu')),
  duration: Joi.number().integer().messages({
    'number.base': 'Durasi lagu harus berupa angka',
    'number.integer': 'Durasi lagu harus berupa angka bulat'
  }),
  albumId: Joi.string().messages({
    'string.base': 'ID album harus berupa string'
  })
});
var SongQuerySchema = Joi.object({
  title: Joi.string().allow(null, '').messages({
    'string.base': 'Judul lagu harus berupa string'
  }),
  performer: Joi.string().allow(null, '').messages({
    'string.base': 'Penampil lagu harus berupa string'
  })
});
module.exports = {
  SongPayloadSchema: SongPayloadSchema,
  SongQuerySchema: SongQuerySchema
};