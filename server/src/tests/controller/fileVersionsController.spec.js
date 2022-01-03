const { FileVersions, request, app } = require("../common-jest");
const testFiles = require("../mocks/fileVersions");

let file = testFiles[0];

describe("find files", () => {
	beforeEach(async () => {
		await FileVersions.create(file)
			.then(createdFile => {
				console.log("Test files created: " + createdFile);
				file = createdFile;
			}).catch(e => console.log(e));
	});
	it("finds all files", async () => {
		request(app)
			.get(`/fileVersions`)
			.expect(200)	
	});
});