import supertest from 'supertest';
const request =  supertest('https://gorest.co.in/public/v1');
import {expect } from 'chai';
const token='b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb';
let newUser;
let postId;

describe.only('Get Request using async and await', () => {
    
    it.only('/posts', async () => {
        
        const postdata = {
            user_id: 10002,
            title: 'My title',
            body: 'My Bolg Post'
         };
         
        const res= await request
                            .post('posts')
                            .set('Authorization', `Bearer ${token}`)
                            .send(postdata)

    console.log('Post Id is ', res.body);
    postId=res.body.id;                            

    });

    // it('Get Post id', async () => {
        
    //     await request
    //                 .get(`posts/${postId}`)
    //                 .set('Authorization', `Bearer ${token}`)
    //                 .expect(200)
    // });
});