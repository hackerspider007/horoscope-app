const express = require("express");
const app = express();

const port = 3000;
app.use(require('./routes'));

const path = require("path");

// set a view engine here its ejs
app.set("view engine", "ejs");
app.use(express.urlencoded());
//  set a path to find the view engine(ejs) folder
app.set("views", path.join(__dirname, "views"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error  in running server ${err}`);
    return;
  }

  console.log(`Server up and running on port ${port}`);
});
