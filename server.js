var static = require("node-static");
const https = require("https");
const fs = require("fs");
const path = require("path");

const options = {
  key: fs.readFileSync("private.pem"),
  cert: fs.readFileSync("b53ccbf33cc24155.pem"),
};
const file = new static.Server();

https
  .createServer(options, function (req, res) {
    req
      .addListener("end", function () {
        file.serve(req, res);
      })
      .resume();
  })
  .listen(443);

/*
const httpsServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "../src/public/ssl/private.pem")),
    cert: fs.readFileSync(
      path.join(__dirname, "../src/public/ssl/b53ccbf33cc24155.pem")
    ),
    ca: fs.readFileSync(
      path.join(__dirname, "../src/public/ssl/gd_bundle-g2-g1.crt")
    ),
  },
  app
);

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
*/
