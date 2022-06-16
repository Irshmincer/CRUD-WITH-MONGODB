const { MongoClient } = require("mongodb");
const uri =
  "mongodb://myUserAdmin:myUserAdmin@localhost:27017/?authMechanism=DEFAULT&authSource=admin";
const users = require("./users");

module.exports = (app) => {
  app.post("/users/create", users.create);

  //get by id
  app.get("/users", users.getalltheusers);

  app.get("/users/:id", users.getById);
  //all delete
  app.delete("/users/deleteall", users.deleteAllTheUsers);
  //delete by id
  app.delete("/users/delete/:id", users.deletebyid);
  //edit
  app.put("/users/update", users.editTheUsers);
};
