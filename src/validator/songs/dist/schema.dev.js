"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Joi = require('joi'); // Fungsi untuk membuat pesan error kustom


var createMessages = function createMessages(fieldName) {
  var customMessages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread({
    'string.base': "".concat(fieldName, " harus berupa string"),
    'string.empty': "".concat(fieldName, " harus diisi"),
    'any.required': "".concat(fieldName, " harus diisi"),
    'number.base': "".concat(fieldName, " harus berupa angka"),
    'number.integer': "".concat(fieldName, " harus berupa angka bulat"),
    'number.min': "".concat(fieldName, " minimal 1900"),
    'number.max': "".concat(fieldName, " maksimal 2030")
  }, customMessages);
}; // Schema untuk payload lagu


var SongPayloadSchema = Joi.object({
  title: Joi.string().required().messages(createMessages('Judul lagu')),
  year: Joi.number().integer().min(1900).max(2030).required().messages(createMessages('Tahun lagu', {
    'number.base': 'Tahun lagu harus berupa angka',
    'number.integer': 'Tahun lagu harus berupa angka bulat',
    'number.min': 'Tahun lagu minimal 1900',
    'number.max': 'Tahun lagu maksimal 2030'
  })),
  genre: Joi.string().required().messages(createMessages('Genre lagu')),
  performer: Joi.string().required().messages(createMessages('Penampil lagu')),
  duration: Joi.number().integer().messages(createMessages('Durasi lagu', {
    'number.base': 'Durasi lagu harus berupa angka',
    'number.integer': 'Durasi lagu harus berupa angka bulat'
  })),
  albumId: Joi.string().messages(createMessages('ID album'))
}); // Schema untuk query lagu

var SongQuerySchema = Joi.object({
  title: Joi.string().allow(null, '').messages(createMessages('Judul lagu')),
  performer: Joi.string().allow(null, '').messages(createMessages('Penampil lagu'))
});
module.exports = {
  SongPayloadSchema: SongPayloadSchema,
  SongQuerySchema: SongQuerySchema
};