import express, { response } from "express";

const app = express();
app.use(express.json());

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

const resolveIndexByUserId = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const userId = parseInt(id, 10);
  if (isNaN(userId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === userId);

  if (findUserIndex < 0) return response.sendStatus(404);

  request.findUserIndex = findUserIndex;
  next();
};

const PORT = process.env.PORT || 8080;

const mockUsers = [
  { id: 1, username: "charles", displayName: "slopes" },
  { id: 2, username: "timothy", displayName: "timzy" },
  { id: 3, username: "ajuzie", displayName: "juzi" },
  { id: 4, username: "ikenna", displayName: "arch" },
  //   { id: 5, username: "emeka", displayName: "mekz" },
  //   { id: 6, username: "sandra", displayName: "sandy" },
  //   { id: 7, username: "victor", displayName: "vick" },
  //   { id: 8, username: "amara", displayName: "amy" },
  //   { id: 9, username: "precious", displayName: "prez" },
  //   { id: 10, username: "kenneth", displayName: "kenny" },
  //   { id: 11, username: "chioma", displayName: "chi" },
  //   { id: 12, username: "frank", displayName: "franko" },
  //   { id: 13, username: "gloria", displayName: "glo" },
  //   { id: 14, username: "david", displayName: "dave" },
  //   { id: 15, username: "promise", displayName: "prome" },
  //   { id: 16, username: "isaac", displayName: "zack" },
  //   { id: 17, username: "ebuka", displayName: "buks" },
  //   { id: 18, username: "flora", displayName: "flo" },
  //   { id: 19, username: "prince", displayName: "pman" },
  //   { id: 20, username: "juliet", displayName: "jules" },
  //   { id: 21, username: "moses", displayName: "mozy" },
  //   { id: 22, username: "divine", displayName: "divy" },
  //   { id: 23, username: "abigail", displayName: "abi" },
  //   { id: 24, username: "chinedu", displayName: "nedu" },
  //   { id: 25, username: "benita", displayName: "beni" },
  //   { id: 26, username: "samuel", displayName: "sammy" },
  //   { id: 27, username: "faith", displayName: "fay" },
  //   { id: 28, username: "gideon", displayName: "gidz" },
  //   { id: 29, username: "tosin", displayName: "toss" },
];

const products = [
  { id: 1, name: "sausage roll", price: 5.99, quantity: 20 },
  { id: 2, name: "chocolate donut", price: 2.49, quantity: 50 },
  { id: 3, name: "bottle water 50cl", price: 1.0, quantity: 200 },
  { id: 4, name: "beef pie", price: 3.75, quantity: 35 },
  { id: 5, name: "chicken sandwich", price: 6.5, quantity: 40 },
  { id: 6, name: "energy drink", price: 2.99, quantity: 120 },
];

app.use(loggingMiddleware);

app.get("/", (request, response) => {
  response.status(201).send({ message: "welcome to the woorld of express" });
});

// a get request to display all the users from the database
app.get("/api/users", (request, response) => {
  const { filter, value } = request.query;
  console.log(filter, value);

  if (filter && value) {
    const filteredUser = mockUsers.filter((user) =>
      user[filter].includes(value)
    );
    return response.send(filteredUser);
  }

  return response.status(201).send(mockUsers);
});

// a post request to send a message body to the user
app.post("/api/users", (request, response) => {
  const { body } = request;

  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

// a get request to display a single user by the id
app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  const user = mockUsers[findUserIndex];

  if (!user) {
    return response.sendStatus(404);
  }
  return response.send(user);
});

// a get request to display all the products
app.get("/api/products", (request, response) => {
  response.send(products);
});

app.listen(PORT, () => {
  console.log(`server is lisening on port ${PORT}`);
});

//put
app.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

//patch
app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return response.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
//delete
