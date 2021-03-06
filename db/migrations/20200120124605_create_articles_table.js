
exports.up = function(knex) {
    return knex.schema.createTable("articles", (articlesData) => {
        articlesData.increments("article_id").primary();
        articlesData.string("title").notNullable();
        articlesData.string("body", 5000).notNullable();
        articlesData.integer("votes").defaultTo(0);
        articlesData.string("topic").references("topics.slug").notNullable();
       
        articlesData.string("author").references("users.username").notNullable();
        articlesData.timestamp("created_at").defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("articles");
  
};
