exports.up = function(knex, Promise) {
  return knex.schema.createTable('solutions', function (table) {
    table.uuid('uuid').primary();
    table.string('slug_long').notNullable().unique();
    table.string('slug_short').notNullable().unique();
    table.text('description');
    table.string('level').notNullable();
    table.string('code').notNullable();
    table.string('message').notNullable();
    table.string('programminglanguage').notNullable();
    table.string('programminglanguage_version');
    table.string('os').notNullable();
    table.string('os_version').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('solutions')
};
