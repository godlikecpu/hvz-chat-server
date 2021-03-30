const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");

var io = require("socket.io")(http, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization, jwt",
      "Access-Control-Allow-Origin": "*", //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
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
