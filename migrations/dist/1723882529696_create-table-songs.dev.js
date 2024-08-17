"use strict";

exports.shorthands = undefined;

exports.up = function (pgm) {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    title: {
      type: 'TEXT',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    genre: {
      type: 'TEXT',
      notNull: true
    },
    performer: {
      type: 'TEXT',
      notNull: true
    },
    duration: {
      type: 'INTEGER',
      notNull: false
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: false,
      references: '"albums"',
      onDelete: 'CASCADE' // Menghapus lagu jika album terkait dihapus

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
  pgm.dropTable('songs');
};