// import supertest from 'supertest';
// import config  from '../qa/config'
// const request = supertest(config.baseUrl);
import request  from '../config/common';
import {expect} from 'chai';
import { createRandomUser } from '../helper/user_helpers';
const token='b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb';

describe.only('Creating user ', () => {
    let userId, postId;

    before(async () => {
        userId = await createRandomUser();
});
    it('user creation',  async() => {
        const postdata = {
            user_id: userId,
            title: `My Title ${userId}`,
            body: `My blog Post ${userId}`
        }
                    const res = await request
                                            .post('/posts')
                                            .set('Authorization', `Bearer ${token}`)
                                            .send(postdata)
                    console.log(res.body.data.id);
                    postId=res.body.data.id;       
    })

    it('Get the post id details', async () => {
        const postidresp= await request
        .get(`/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        console.log('postidrep details are', postidresp.body.data)  

    });
    it('401 Authentication Failed', async () => {
        const postdata = {
            user_id: userId,
            title: `My Title ${userId}`,
            body: `My blog Post ${userId}`
        }

        const authResp = await request
                                        .post('/posts')
                                        .send(postdata)
        expect(authResp.statusCode).to.be.equals(401)
    });
});

