const app = require("express")();
const https = require("https").createServer(app);

const io = require("socket.io")(https, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

https.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
