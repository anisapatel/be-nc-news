
exports.up = function(knex) {
    console.log("Creating users table...");
    return knex.schema.createTable("users", (usersTable) => {
        usersTable.increments('user_id').primary();
        usersTable.string("username").notNullable();
        usersTable.string("name");


    })
  
};

exports.down = function(knex) {
    console.log("Removing users table...");
    return knex.schema.dropTable("users");

  
};
