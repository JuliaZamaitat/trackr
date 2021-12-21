import mongoose from 'mongoose';
import { Request, Response } from 'express';
const fileVersionsController = require("../../controller/fileVersionsController")

const mongodbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/trackr";

describe('Get all files request', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: any; //Partial<Response>;
  let responseObject: any;
  let mongoClient: typeof mongoose;

  beforeAll(async () => {
    mongoClient = await mongoose.connect(mongodbURI as string);
  });

  afterAll(async () => {
    await mongoClient.connection.close();
  });

  beforeEach(() => {
    mockRequest = {};
    const mockResponseGenerator = () => {
      const res: any = {};
      res.status = jest.fn().mockImplementation((st) => {res.statusCode = st; return res;});
      res.json = jest.fn().mockImplementation((json:string) => {res.responseSent(json) ; return res;});
      res.send = jest.fn().mockImplementation((value: any) =>{
        res.responseSent(value);
      });
      res.waitForResponse = new Promise((success,error) =>{
        // @ts-ignore
        res.responseSent = success;
      });
      return res;
    };


    mockResponse = mockResponseGenerator();
  });

  afterEach(async () => {
  //  await mongoClient.connection.db.dropDatabase();
  });

  test('200 - files', (done) => {
    const expectedStatusCode = 200;
    const expectedResponse = {
      files: [
        {
          title: "foo bar",
          content: "hey ho, lets go"
        },
        {
          title: "bar baz",
          content: "lorem ipsum"
        }
      ]
    };


    try {
      mockResponse.waitForResponse
        .then((dataSent: any)  => {
          expect(mockResponse.statusCode).toBe(expectedStatusCode);
          expect(dataSent).toEqual(expectedResponse);
          done()
        })
    } catch (error) {
      done(error);
    }

    fileVersionsController.findAll(mockRequest as Request, mockResponse as Response);
  })


})
