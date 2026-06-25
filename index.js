const http = require("http");

const app = http.createServer((req, res) => {
  if (req.url == "/home" && req.method == "GET") {
    res.end("Hello workld");
  }

  if (req.url == "/about" && req.method == "GET") {
    res.end("<h1>Hello, welcome to about page </h1>");
  }
});

app.listen(6060, () => {
  console.log("Server running at 6060");
});

// http://localhost:6060
