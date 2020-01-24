
exports.up = function(knex) {
    // console.log("Creating comments table...");
    return knex.schema.createTable("comments", (commentData) => {
        commentData.increments("comment_id").primary();
        commentData.string("author").notNullable().references("users.username");
        commentData.integer("article_id").references("articles.article_id");
        commentData.integer("votes").defaultTo(0);
        commentData.timestamp("created_at").defaultTo(knex.fn.now());
        commentData.string("body", 5000).notNullable();



    })

  
};

exports.down = function(knex) {
    // console.log("Removing comments table...");
    return knex.schema.dropTable("comments");
  
};
