import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1');
import {expect} from 'chai';
const token='b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb';

describe('user Posts', () => {
    let postId;
    it('/Post',  () => {
        const data = {
                "user_id" : 1002,
                "title": "Welcome",
                "body": "My Post Body"
                };
        
    return request
                .post('/posts') 
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .then((res)=> {
                    console.log('response is ', res.body.data);
                    postId=res.body.data.id;
                    console.log('postid is ', postId);
                    // expect(res.body.data).to.deep.include(data);
                    // userId=res.body.data.id;
                })


    // const res = await request  
    //                             .post(`/posts?access-token=${token}`)
    //                             // .set('Authorization', `Bearer ${token}`)
    //                             .send(data);

    // expect(res.body.data).to.deep.include(data);
    // console.log(res.body.data);

    // expect(res.statusCode).to.be.equals(422);
    // postId=res.body.data.id;

    });

    it('Get the post id', () => {
       return request.get(`posts/${postId}`).then((res)=> {
           console.log('Get the created post details ',res.body)
       })

    });
});