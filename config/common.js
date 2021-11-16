import supertest from 'supertest';
import qa  from './qa'
const request = supertest(qa.baseUrl);

export default request;