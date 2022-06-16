const { MongoClient } = require("mongodb");
const uri =
  "mongodb://myUserAdmin:myUserAdmin@localhost:27017/?authMechanism=DEFAULT&authSource=admin";
module.exports = {
  async create(req, res) {
    const user = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client
      .db("mydb")
      .collection("users")
      .insertOne({
        id: parseInt(user.id),
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      });
    await client.close();
    res.status(200).send({
      status: "ok",
      message: "User with ID = " + user.id + " is created",
      user: user,
    });
  },

  async getalltheusers(req, res) {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const users = await client
      .db("mydb")
      .collection("users")
      .find({})
      .toArray();
    await client.close();
    res.status(200).send(users);
  },

  async getById(req, res) {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client
      .db("mydb")
      .collection("users")
      .findOne({ id: id });
    await client.close();
    res.status(200).send({
      status: "ok",
      user: user,
    });
  },

  async deleteAllTheUsers(req, res) {
    const id = req.body;

    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db("mydb").collection("users").deleteMany();
    console.log(user);
    await client.close();
    res.status(200).send({
      status: "ok",
      message: "All the collections are deleted",
    });
  },

  async deletebyid(req, res) {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client
      .db("mydb")
      .collection("users")
      .deleteOne({ id: id });
    console.log(user);
    await client.close();
    res.status(200).send({
      status: "ok",
      message: `user id=${id} has been deleted`,
    });
  },

  async editTheUsers(req, res) {
    const user = req.body;
    const id = parseInt(user.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client
      .db("mydb")
      .collection("users")
      .updateOne(
        { id: id },
        {
          $set: {
            id: parseInt(user.id),
            fname: user.fname,
            lname: user.lname,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
        }
      );
    await client.close();
    res.status(200).send({
      status: "ok",
      message: "User with ID = " + id + " is updated",
      user: user,
    });
  },
};
