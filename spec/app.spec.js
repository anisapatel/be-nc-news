process.env.NODE_ENV = 'test';
const app = require("../app");
const request = require("supertest");
const {expect} = require("chai");
const knex = require("../db/connection")


describe("/api", () => {
beforeEach(() => knex.seed.run());
  after(() => knex.destroy());
    describe("/topics", () => {
        describe("GET", () => {
            it("status: 200, responds with an array of topic objects", () => {
                return request(app).get("/api/topics").expect(200).then(({body}) => {
                    expect(body.topics).to.be.an("array");
                    expect(body.topics.length).to.equal(3);
                })
            })
            it("status: 200, topics objects array contains keys 'slug' and 'description'", () => {
                return request(app).get("/api/topics").expect(200).then(({body}) => {
                    expect(body.topics[0]).to.contain.keys('slug', 'description')

                })
            })
            it("status: 404, when passed a path that does not exist", () => {
                return request(app).get("/api/t").expect(404).then(({body}) => {
                    expect(body.msg).to.equal('Path not found')
                })

            })
            
        })
    })
    describe("/users/username", () => {
        describe("GET", () => {
            it("status: 200, gets a user by their username", () => {
                return request(app).get("/api/users/butter_bridge").expect(200).then(({body}) => {
                    expect(body.user).to.eql([
                        {
                          username: 'butter_bridge',
                          name: 'jonny',
                          avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
                        }
                      ])
                    expect(body.user.length).to.equal(1);
                })
                
            })
            it("status: 404 - for valid but non existent username", () => {
                return request(app)
                .get("/api/users/bananas")
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).to.equal("This username does not exist")
                })
            })
            xit("status: 400 - BAD REQUEST, invalid username", () => {
                return request(app)
                .get("/api/users/67854")
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).to.equal("BAD REQUEST")
                })
            })
        })
    })
    describe("/api/articles/:article_id", () => {
        describe("GET", () => {
            it("status: 200 responds with an article using the article_id", () => {
                return request(app)
                .get("/api/articles/1")
                .expect(200)
                .then(({body}) => {
                    expect(body.article[0]).to.contain.keys('author', 'title', 'body', 'topic', 'created_at', 'votes', 'article_id', 'comment_count')
                })
            })
            it("status: 404 - for valid but non existent article_id", () => {
                return request(app)
                .get("/api/articles/700")
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).to.equal("This article_id does not exist")
                })
            })
            it("status: 400 - BAD REQUEST, invalid article_id", () => {
                return request(app)
                .get("/api/articles/apples")
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).to.equal("BAD REQUEST")
                })
            })
            
        })
        describe("PATCH", () => {
            it("status: 200 responds with the updated article based on article_id", () => {
                return request(app)
                .patch("/api/articles/1")
                .send({ inc_votes : 1 })
                .expect(200)
                .then(({body}) => {
                    // expect(body).to.equal({
                    //     updatedArticle: {
                    //       article_id: 1,
                    //       title: 'Living in the shadow of a great man',
                    //       body: 'I find this existence challenging',
                    //       votes: 101,
                    //       topic: 'mitch',
                    //       author: 'butter_bridge',
                    //       created_at: '2018-11-15T12:21:54.171Z'
                    //     }
                    //   })
                      expect(body.updatedArticle.votes).to.equal(101)
                      expect(body.updatedArticle).to.contain.keys('article_id', 'title', 'body', 'votes', 'topic', 'created_at')
                
            })
            
            })
            it("status: 400 - BAD REQUEST, invalid article_id", () => {
                return request(app)
                .patch("/api/articles/apples")
                .send({ inc_votes : 1 })
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).to.equal("BAD REQUEST")
                })
            })
            xit("status: 404 - Attempted to patch an empty object", () => {
                return request(app)
                .patch("/api/articles/apples")
                .send({})
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).to.equal("Attempted to patch an empty object")
                })
            })
    })
})
describe("/api/articles/:article_id/comments", () => {
    describe("POST", () => {
        it("status: 200, posted a comment using the article_id", () => {
            return request(app)
            .post("/api/articles/1/comments")
            .send({username: 'butter_bridge', body: 'cool article'})
            .expect(200)
            .then(({body}) => {
                expect(body.postedComment).to.equal({
                    body:
                      'cool article',
                    belongs_to: 'Living in the shadow of a great man',
                    created_by: 'butter_bridge',
                    votes: 14,
                    created_at: 1479818163389,
                  })
            })
        })
    })
})

});