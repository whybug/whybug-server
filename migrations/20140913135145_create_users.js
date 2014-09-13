exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('uuid').primary();
    table.string('email').notNullable();
    table.string('display_name').notNullable();
    table.string('avatar_url').notNullable();
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};

