import supertest from 'supertest';
const request =  supertest('https://gorest.co.in/public/v1');
import {expect } from 'chai';
const token='b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb';
let newUser;
const data = {
    email:`test-${Math.floor(Math.random()* 9999)}@gmail.com`, 
    name: 'testname',
    gender: 'male',
    status: 'inactive' 
};
describe('POST New User data', () => {


    it('POST /Users', () => {
      
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
                    newUser=res.body.data.id;
                    console.log('New User is ', newUser);
                    expect(res.body.data).to.deep.include(data);

                });
    });
});

describe('Get Status Code', () => {
    it('GET /Users', () => {
        // request.get(`/users?access-token=${token}`).end((err, res)=> {
        //     console.log(res.statusCode);
        //     expect(res.body.data).to.not.be.empty;
        //     expect(res.statusCode).to.be.equal(200);
        //     done();
        // })

       return request.get(`/users?access-token=${token}`).then((res)=> {
           expect(res.body.data).to.not.be.empty;
       })
    });
});

describe('Get User Validation', () => {
    
    it('GET /Users/:id', () => {
        return request.get(`/users/${newUser}?access-token=${token}`).then((res)=> {
            expect(res.body.data.id).to.be.eq(newUser);
            expect(res.body.data.name).to.be.eq(data.name);
            expect(res.body.data.gender).to.be.eq(data.gender);
            expect(res.body.data.status).to.be.eq(data.status);
        })
    });
    
    it('GET /Users with query params', ()=> {
        return request.get(`/users?access-token=${token}&page=5&gender=female&status=inactive`).then((res)=> {
            // https://gorest.co.in/public/v1/users?access-token=b471a4c442b596ac5ba189f97f4dd2c08b599af7d7bda21a527c36e6f99b48cb&page=5&gender=female&status=inactive
            console.log('********',res.body.data);
            res.body.data.forEach((data)=> {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('inactive');
            })
            // expect(res.body.data).to.not.be.empty;
        })

        // return request
        //                 .get(`/users`)
        //                 .set('Authorization', `Bearer ${token}`)
        //                 .set('gender', 'female')
        //                 .set('status','inactive')
        //                 .then((err, res)=> {
        //                     console.log('Response is ',res)
        // })
    })   

});


describe('Updating New User data', () => {
    it('PUT /user:id', ()=> {
    
        const updateData = {
            status: "active",
            name: `Testingname-${Math.floor(Math.random()* 9999)}`
        }
        return request
                        .put(`/users/${newUser}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(updateData)
                        .then((res)=> {
                            console.log('After Update ', res.body)
                            expect(res.body.data).to.deep.include(updateData);
                            
                        })
    })
    
});

    




describe('Deleting the newly Created data', () => {
    
    it('DELETE /User:id', ()=> {
        return request
                    .delete(`/users/${newUser}`)
                    .set('Authorization', `Bearer ${token}`)
                    .then((res)=> {
                        // console.log('After deleting ',res.body.data);
                        expect(res.body.data).to.be.eq(undefined);
    
                    })
    })
});

