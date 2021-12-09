let url;
if (process.env.NODE_ENV == "production") {
  url = "";
} else {
  url = "http://localhost:3000/";
}

module.exports = {
  url: url,
};
