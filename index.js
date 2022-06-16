const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
require("./route")(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});

//insert or create the collections
