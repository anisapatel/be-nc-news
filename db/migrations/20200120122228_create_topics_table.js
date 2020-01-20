
exports.up = function(knex) {
    console.log("Creating topics table...");

    return knex.schema.createTable("topics", (topicsTable) => {
        topicsTable.increments('slug').primary();
        topicsTable.string('description');
    })


  
};

exports.down = function(knex) {
    console.log("Removing topics table...");
    return knex.schema.dropTable("topics");
  
};
