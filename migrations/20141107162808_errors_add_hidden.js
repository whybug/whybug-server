'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('errors', function (table) {
    table.boolean('hidden').after('api_key').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('errors', function (table) {
    table.dropColumn('hidden');
  });
};
