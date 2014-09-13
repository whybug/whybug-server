exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_profiles', function (table) {
    table.uuid('uuid').primary();
    table.uuid('user_uuid').notNullable().index();
    table.string('provider');
    table.string('external_id');
    table.string('username').notNullable();
    table.string('email');
    table.string('display_name').notNullable();
    table.string('avatar_url').notNullable();
    table.string('profile_url').notNullable();
    table.integer('login_count').notNullable().unsigned().defaultTo(1);
    table.timestamp('last_login_at').notNullable();
    table.unique(['provider', 'external_id']);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users_profiles')
};
