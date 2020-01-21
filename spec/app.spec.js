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
                })
            })
            it("status: 200, topics objects array contains keys 'slug' and 'description'", () => {
                return request(app).get("/api/topics").expect(200).then(({body}) => {
                    expect(body.topics[0]).to.contain.keys('slug', 'description')

                })
            })
            it("status: 404, when passed a path that does not exist", () => {
                return request(app).get("/api/t").expect(404).then(({body}) => {
                    expect(body.msg).to.equal('Route not found')
                })

            })
            
        })
    })
    describe("/users/user_id", () => {
        describe("GET", () => {
            it("status: 200, gets a user by their user_id", () => {
                return request(app).get("/api/users/1").expect(200).then(({body}) => {
                    console.log(body)
                    expect(body).to.eql({
                        user: {
                            username: 'butter_bridge',
                            name: 'jonny',
                            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                        }
                    })
                })
            })
        })
    })
})

