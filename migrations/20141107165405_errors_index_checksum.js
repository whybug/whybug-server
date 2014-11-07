'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('errors', function (table) {
    table.index('checksum');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('errors', function (table) {
    table.dropIndex('checksum');
  });
};
