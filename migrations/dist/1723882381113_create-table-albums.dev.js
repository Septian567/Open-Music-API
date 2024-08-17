"use strict";

exports.shorthands = undefined;

exports.up = function (pgm) {
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    name: {
      type: 'TEXT',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      "default": pgm.func('current_timestamp')
    },
    updated_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      "default": pgm.func('current_timestamp')
    }
  });
};

exports.down = function (pgm) {
  pgm.dropTable('albums');
};