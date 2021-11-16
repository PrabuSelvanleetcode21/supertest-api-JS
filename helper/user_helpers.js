import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1');
import {expect} from 'chai';
const token='b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb';
export const createRandomUser = async()=> {
    const data = {
        email:`test-${Math.floor(Math.random()* 9999)}@gmail.com`, 
        name: 'testname',
        gender: 'male',
        status: 'inactive' 
    };
   const resp =  await request.post('/users')
    .set('Authorization', `Bearer ${token}`)
    .send(data)

    return await resp.body.data.id;

}