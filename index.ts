import express, { Application } from "express";
const app: Application = express();
const port = 3000;
const authRouter = require("./routes/auth");
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
});

app.use("/auth", authRouter);

// app.get("/home/:name/:age", (req, res) => {
//   // request parameters are accessed via req.params
//   const { name, age } = req.params;
//   res.send(`Hello, ${name}! You are ${age} years old.`);
// });
// app.get("/home", (req, res) => {
//   // request query
//   const { name, age } = req.query;
//   res.send(`Hello, ${name}! You are ${age} years old.`);
// });
// app.get("/home", (req, res) => {
//   req.body; // request body
// });
// app.get("/home", (req, res) => {
//   // response.send() method is used to send a response to the client
//   res.send(
//     "<h1>Home Page</h1><p>Welcome to the home page of our Express server.</p>",
//   );
// });
app.get("/home", (req, res) => {
  // response.send() method is used to send a response to the client
  // response.json() method is used to send a JSON response to the client
  // response.status() method is used to set the status code of the response
  res.status(200).json({
    message: "No content to send",
  });
});

app.post("/about", (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  res.send(
    `<h1>About Page ${email}</h1><p>This is the about page of our Express server. Your password is ${password}.</p>`,
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
