let url: string;
if (process.env.NODE_ENV == "production") {
  url = "";
} else {
  url = "http://localhost:3000/";
}

export default {
  url,
};
