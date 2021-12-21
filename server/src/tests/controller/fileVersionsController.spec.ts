import mongoose from 'mongoose';
import { Request, Response } from 'express';
const fileVersionsController = require("../../controller/fileVersionsController")

const mongodbURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/trackr";

describe('Get all files request', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
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
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    mockResponse = mockResponseGenerator();
  });

  afterEach(async () => {
  //  await mongoClient.connection.db.dropDatabase();
  });

  test('200 - files', () => {
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

    fileVersionsController.findAll(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  })

})
