import mongoose from 'mongoose';
import { Request, Response } from 'express';
const FileVersions = require( "../../model/fileVersions");
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
    await FileVersions.deleteMany();
  });

  test('200 - files', (done) => {
    const expectedStatusCode = 200;

    try {
      mockResponse.waitForResponse
        .then((dataSent: any)  => {
          expect(mockResponse.statusCode).toBe(expectedStatusCode);
          done()
        })
    } catch (error) {
      done(error);
    }

    fileVersionsController.findAll(mockRequest as Request, mockResponse as Response);
  })


  // @ts-ignore
  test('response - files',   (done) => {
    // this response cannot be returned

    const expectedResponse = {
      files: [
        {
          title: "foo bar"
        },
        {
          title: "bar baz"
        }
      ]
    };

    try {
      mockResponse.waitForResponse
        .then((dataSent: any)  => {
           expect(dataSent.length).toEqual(2);
          done()
        })
    } catch (error) {
      done(error);
    }
    const result =  FileVersions.create(expectedResponse.files)
      .then((createResult:any) =>{
    fileVersionsController.findAll(mockRequest as Request, mockResponse as Response);
    })
  })


})
