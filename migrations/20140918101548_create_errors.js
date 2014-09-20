'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('errors', function (table) {
    table.uuid('uuid').primary();
    table.uuid('errorgroup_uuid').index().notNullable();
    table.uuid('api_key').index();
    table.uuid('client_ip').notNullable();
    table.string('protocol_version').notNullable();
    table.string('level').notNullable();
    table.string('code').notNullable();
    table.text('message').notNullable();
    table.string('programminglanguage').notNullable();
    table.string('programminglanguage_version').notNullable();
    table.string('os').notNullable();
    table.string('os_version').notNullable();
    table.string('file_path').notNullable();
    table.integer('line').notNullable();
    table.timestamp('created_at').notNullable().defaultTo('NOW');

  });
};
/*
.createTable('solutions', function(table) {
    table.uuid('uuid').primary();
    table.string('slug_long').notNullable().unique();
    table.string('slug_short').notNullable().unique();
    table.text('description');
    table.string('context_level').notNullable();
    table.string('context_code').notNullable();
    table.string('context_message').notNullable();
    table.string('context_programminglanguage').notNullable();
    table.string('context_programminglanguage_version');
    table.string('context_os').notNullable();
    table.string('context_os_version').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps();
  })
*/

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('errorlogs')
};
