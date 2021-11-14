import supertest from 'supertest';
const request =  supertest('https://gorest.co.in/public/v1');
import {expect } from 'chai';
const token='b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb';


describe('Get Status Code', () => {
    // it('GET /Users', () => {
        // request.get(`/users?access-token=${token}`).end((err, res)=> {
            
        //     console.log(res.statusCode);
        //     expect(res.body.data).to.not.be.empty;
        //     expect(res.statusCode).to.be.equal(200);
        //     done();
        // })

    //    return request.get(`/users?access-token=${token}`).then((res)=> {
    //        expect(res.body.data).to.not.be.empty;
    //    })
    // });

    it('GET /Users/:id', () => {
        return request.get(`/users/16?access-token=${token}`).then((res)=> {
            expect(res.body.data.id).to.be.eq(16);
            expect(res.body.data.name).to.be.eq('Hamsini Rana I');
            expect(res.body.data.gender).to.be.eq('female');
            expect(res.body.data.status).to.be.eq('inactive');
        })
    });

    it('GET /Users with query params', ()=> {
        return request.get(`/users?access-token=b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb&page=5&gender=female&status=inactive`).then((res)=> {
            // https://gorest.co.in/public/v1/users?access-token=b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb&page=5&gender=female&status=inactive
            // console.log('********',res.body.data);
            res.body.data.forEach((data)=> {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('inactive');
            })
            // expect(res.body.data).to.not.be.empty;
        })
    })

    it.only('POST /Users', () => {
        const data = {
            email:`test-${Math.floor(Math.random()* 9999)}@gmail.com`, 
            name: 'testname',
            gender: 'male',
            status: 'inactive' 
        };
        return request
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .then((res)=> {
                    console.log(res.body);
                    // expect(res.body.data.email).to.be.eq(data.email)
                    // expect(res.body.data.name).to.be.eq(data.name)
                    // expect(res.body.data.gender).to.be.eq(data.gender)
                    // expect(res.body.data.status).to.be.eq(data.status)
                    expect(res.body.data).to.deep.include(data);
                });
    });
});
