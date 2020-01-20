
exports.up = function(knex) {
    console.log("Creating articles table...");
    return knex.schema.createTable("articles", (articlesData) => {
        articlesData.increments("article_id").primary();
        articlesData.string("title").notNullable();
        articlesData.string("body").notNullable();
        articlesData.integer("votes").defaultTo(0);
        articlesData.string("author").notNullable();
        articlesData.integer("author_id").references("users.user_id");
        articlesData.timestamp("created_at").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    console.log("Removing articles table...");
    return knex.schema.dropTable("articles");
  
};
