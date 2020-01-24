
exports.up = function(knex) {
    // console.log("Creating users table...");
    return knex.schema.createTable("users", (usersTable) => {
        usersTable.string("username").primary().notNullable();
        usersTable.string("name").notNullable();
        usersTable.string("avatar_url").notNullable();
    })
};

exports.down = function(knex) {
    // console.log("Removing users table...");
    return knex.schema.dropTable("users");

  
};
