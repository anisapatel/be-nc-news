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
    describe("/users/user_id", () => {
        describe("GET", () => {
            it("status: 200, gets a user by their user_id", () => {
                return request(app).get("/api/users/1").expect(200).then(({body}) => {
                    expect(body).to.eql({
                        user: [{
                            user_id: 1,
                            username: 'butter_bridge',
                            name: 'jonny',
                            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                        }]
                    })
                    expect(body.user.length).to.equal(1);
                })
                
            })
            it("status: 404 - for valid but non existent id", () => {
                return request(app)
                .get("/api/users/89")
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).to.equal("This user_id does not exist")
                })
            })
            it("status: 400 - BAD REQUEST, invalid id", () => {
                return request(app)
                .get("/api/users/johnny")
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).to.equal("BAD REQUEST - invalid id")
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
        })
    })
})

