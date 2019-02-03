
const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;

describe('Topic', () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: 'Expeditions to Alpha Centauri',
                description: 'A compilation of reports from recent visits to the star system.'
            }).then((topic) => {
                this.topic = topic;
                Post.create({
                    title: 'My first visit to Proxima Centauri b',
                    body: 'I saw some rocks.',
                    topicId: this.topic.id
                }).then((post) => {
                    this.post = post;
                    done();
                });
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe('#create()', () => {
        it('should create a topic object with a title and description', (done) => {
            Topic.create({
                title: 'How to use GSAP',
                description: 'A tutorial thread on creating animations with GSAP'
            }).then((topic) => {
                expect(topic.title).toBe('How to use GSAP');
                expect(topic.description).toBe('A tutorial thread on creating animations with GSAP');
                done();
            }).catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should not create a topic with a missing title or description', (done) => {
            Topic.create({
                title: 'How to use GSAP'
            }).then((topic) => {
                done();
            }).catch((err) => {
                expect(err.message).toContain('Topic.description cannot be null');
                done();
            });
        });
    });

    describe('#getPosts()', () => {
        it('should return all posts associated with a topic', (done) => {
            this.topic.getPosts().then((posts) => {
                expect(posts[0].title).toBe('My first visit to Proxima Centauri b');
                done();
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });
});



