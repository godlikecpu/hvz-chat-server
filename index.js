const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");

var io = require("socket.io")(http, {
  handlePreflightRequest: (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, OPTIONS"
      );
      res.header("Access-Control-Max-Age", 120);
      return res.status(200).json({});
    }
    next();
  },
});
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (data) => {
    console.log(data.user + ": " + data.message);
    socket.emit("message", data);
    socket.broadcast.emit("message", data);
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
