process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
chai.use(chaiSorted);
const knex = require("../db/connection");

describe("/api", () => {
  beforeEach(() => knex.seed.run());
  after(() => knex.destroy());
  it("status 404, invalid path", () => {
    return request(app)
      .get("/invalid-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal("Path not found");
      });
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("status: 200, responds with an array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics.length).to.equal(3);
          });
      });
      it("status: 200, topics objects array contains keys 'slug' and 'description'", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics[0]).to.contain.keys("slug", "description");
          });
      });
      it("status: 404, when passed a path that does not exist", () => {
        return request(app)
          .get("/api/t")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Path not found");
          });
      });
    });
    it("status: 405, handle invalid methods on /api/topics", () => {
      const invalidMethods = ["patch", "put", "del", "post"];

      const promisesArr = invalidMethods.map(method => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid method.");
          });
      });
      return Promise.all(promisesArr);
    });
  });
  describe("/users/username", () => {
    describe("GET", () => {
      it("status: 200, gets a user by their username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.user).to.eql([
              {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              }
            ]);
            expect(body.user).to.be.an("array");
          });
      });
      it("status: 404 - for valid but non existent username", () => {
        return request(app)
          .get("/api/users/bananas")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("This username does not exist");
          });
      });
      it("status: 404, when passed a path that does not exist", () => {
        return request(app)
          .get("/pia/users")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Path not found");
          });
      });
    });
    it("status: 405, handle invalid methods on /api/users/username", () => {
      const invalidMethods = ["patch", "put", "del", "post"];

      const promisesArr = invalidMethods.map(method => {
        return request(app)
          [method]("/api/users/butter_bridge")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid method.");
          });
      });
      return Promise.all(promisesArr);
    });
  });
  describe("/api/articles/:article_id", () => {
    describe("GET", () => {
      it("status: 200 responds with an article using the article_id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.be.an("array");
            expect(body.article[0]).to.contain.keys(
              "author",
              "title",
              "body",
              "topic",
              "created_at",
              "votes",
              "article_id",
              "comment_count"
            );
          });
      });
      it("status: 404 - for valid but non existent article_id", () => {
        return request(app)
          .get("/api/articles/700")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("This article_id does not exist");
          });
      });
      it("status: 400 - BAD REQUEST, invalid article_id", () => {
        return request(app)
          .get("/api/articles/apples")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 404, when passed a path that does not exist", () => {
        return request(app)
          .get("/ap/articles")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Path not found");
          });
      });
    });
    describe("PATCH", () => {
      it("status: 200 responds with the updated article based on article_id", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.be.an("array");
            expect(body.article[0].votes).to.equal(101);
            expect(body.article[0]).to.contain.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "created_at"
            );
          });
      });
      it("status: 400 - BAD REQUEST, invalid article_id", () => {
        return request(app)
          .patch("/api/articles/apples")
          .send({ inc_votes: 1 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 404 - Attempted to patch an empty object in articles", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({})
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0].votes).to.equal(100);
          });
      });
    });
    it("status: 405, handle invalid methods on /api/articles/:article_id", () => {
      const invalidMethods = ["post", "put", "del"];

      const promisesArr = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/4")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid method.");
          });
      });
      return Promise.all(promisesArr);
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    describe("POST", () => {
      it("status: 201, posted a comment using the article_id", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "butter_bridge", body: "cool article" })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).to.be.an("array");
            expect(body.comment[0]).to.contain.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("status: 400, invalid comment_id", () => {
        return request(app)
          .post("/api/articles/JOHNYY/comments")
          .send({ username: "butter_bridge", body: "cool article" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 400, attempting to post an empty body", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({})
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 422, attempted to post using the wrong id", () => {
        return request(app)
          .post("/api/articles/5000/comments")
          .send({ username: "butter_bridge", body: "cool article" })
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal("unprocessable post");
          });
      });
      it("status: 400, posting to an invalid table column", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            doesNotExist: "invalid column data",
            username: "butter_bridge"
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 404, when passed a path that does not exist", () => {
        return request(app)
          .get("/ap/artices/1/comm")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Path not found");
          });
      });
      it("status: 400, posting with an invalid data type value", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge"
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
    });
    describe("GET", () => {
      it("status: 200, gets comments for an article id", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.be.an("array");
            expect(body.comment[0]).to.contain.keys(
              "comment_id",
              "votes",
              "created_at",
              "author",
              "body"
            );
          });
      });
      it("status: 200, sorts comments by author", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=author")
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.be.sortedBy("author", {
              descending: true
            });
          });
      });
      it("status: 200, orders comments by ascending order", () => {
        return request(app)
          .get("/api/articles/1/comments?order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.be.ascending;
          });
      });
      it("status: 400, invalid query passed in", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=invalid")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 404, if article id doesn't exist, return an empty array", () => {
        return request(app)
          .get("/api/articles/190/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("This article id does not exist");
          });
      });
    });

    it("status: 405, handle invalid methods on /api/articles/:article_id/comments", () => {
      const invalidMethods = ["patch", "put", "del"];

      const promisesArr = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/3/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid method.");
          });
      });
      return Promise.all(promisesArr);
    });
  });
  describe("/api/articles", () => {
    describe("GET", () => {
      it("status: 200, get all articles formatted correctly", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.be.an("array");
            expect(body.article[0]).to.contain.keys(
              "author",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("status: 200, sorts the articles correctly when passed in any valid sort_by column", () => {
        return request(app)
          .get("/api/articles?sort_by=votes")
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0]).to.contain.keys(
              "author",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(body.article).to.be.sortedBy("votes", { descending: true });
          });
      });
      it("status: 200, filters the articles correctly when passed in a query author and topic", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge&&topic=mitch")
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0]).to.contain.keys(
              "author",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(body.article.length).to.equal(3);
            expect(body.article[0].author).to.equal("butter_bridge");
          });
      });
      it("status: 200, filters the articles correctly when passed in a query like topic and a sort by", () => {
        return request(app)
          .get("/api/articles?sort_by=votes&&author=icellusedkars&&topic=mitch")
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0]).to.contain.keys(
              "author",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(body.article).to.be.sortedBy("votes", { descending: true });
            expect(body.article.length).to.equal(6);
            expect(body.article[0].topic).to.equal("mitch");
          });
      });
      it("status: 200, orders comments by ascending order", () => {
        return request(app)
          .get("/api/articles/3?order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.be.ascending;
          });
      });
      it("status: 404, when passed a path that does not exist", () => {
        return request(app)
          .get("/api/artict")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Path not found");
          });
      });
      it("status: 400, invalid query passed in", () => {
        return request(app)
          .get("/api/articles?sort_by=invalid")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 404, if topic doesn't exist, return an empty array", () => {
        return request(app)
          .get("/api/articles?topic=invalid")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("This topic does not exist");
          });
      });
      it("status: 404, if author doesn't exist, return an empty array", () => {
        return request(app)
          .get("/api/articles?author='abalama")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("This user does not exist");
          });
      });
    });
    it("status: 405, handle invalid methods on /api/articles", () => {
      const invalidMethods = ["delete", "put", "patch", "post"];

      const promisesArr = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid method.");
          });
      });
      return Promise.all(promisesArr);
    });
  });
  describe("/api/comments/:comment_id", () => {
    describe("PATCH", () => {
      it("status: 200, responds with an updated comment decremented if a negative number is passed in", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0]).to.contain.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("status: 200, responds with an updated comment if a positive number is passed in", () => {
        return request(app)
          .patch("/api/comments/3")
          .send({ inc_votes: 3 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0]).to.contain.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment[0].votes).to.equal(103);
          });
      });
      it("status: 400, BAD REQUEST, invalid comment_id", () => {
        return request(app)
          .patch("/api/comments/lollapalooza")
          .send({ inc_votes: 8 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 200, Attempted to patch an empty object in comments", () => {
        return request(app)
          .patch("/api/comments/4")
          .send({})
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(-100);
          });
      });
      it("status: 404, when passed a path that does not exist", () => {
        return request(app)
          .del("/api/COMMMENts")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Path not found");
          });
      });
    });
    describe("DELETE", () => {
      it("status 204, removes comment by comment id", () => {
        return request(app)
          .del("/api/comments/3")
          .expect(204);
      });
      it("status: 400, BAD REQUEST,invalid comment_id", () => {
        return request(app)
          .del("/api/comments/IOWA")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("BAD REQUEST");
          });
      });
      it("status: 404, when passed a path that does not exist", () => {
        return request(app)
          .del("/api/COMMEN")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Path not found");
          });
      });
    });
    it("status: 405, handle invalid methods on /api/comments/:comment_id", () => {
      const invalidMethods = ["get", "put"];

      const promisesArr = invalidMethods.map(method => {
        return request(app)
          [method]("/api/comments/5")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Invalid method.");
          });
      });
      return Promise.all(promisesArr);
    });
  });
  describe("/api", () => {
    it("GET", () => {
      return request(app)
        .get("/api")
        .expect(200);
    });
  });
});
