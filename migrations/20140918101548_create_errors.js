exports.up = function(knex) {
  return knex.schema.createTable('errors', function (table) {
    table.uuid('uuid').primary();
    table.uuid('api_key').index();
    table.uuid('client_ip').notNullable();
    table.string('checksum').notNullable();
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
    table.timestamp('created_at').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('errors')
};
