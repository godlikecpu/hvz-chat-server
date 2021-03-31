const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
io.origins("*:*");
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.options("*", cors());

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

http.listen(process.env.PORT | 3000, () => {
  console.log("listening on *:3000");
});
