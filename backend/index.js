const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);
const aWSs = WSserver.getWss();

const PORT = process.env.PORT || 5000;

app.ws("/", (ws, req) => {
  ws.send("CONNECTED");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "message":
        break;
    }
  });
});

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWSs.clients.forEach((client) => {
    client.send(`Clients with id ${msg.id} connected`);
  });
};

app.listen(PORT, () => {
  console.log("listen on " + `http://localhost:${PORT}/`);
});
