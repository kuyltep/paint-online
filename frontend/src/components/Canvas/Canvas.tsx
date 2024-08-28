import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brash from "../../tools/Brash";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
const Canvas = observer(() => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { id } = useParams();
  useEffect(() => {
    canvasState.setCanvas(ref.current);
    axios.get("http://localhost:5000/image?id=" + id).then((response) => {
      console.log(response.data);
      const img = new Image();
      img.src = response.data;
      const ctx = ref.current?.getContext("2d");
      const canvas = ref.current;
      img.onload = () => {
        ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
        ctx?.drawImage(img, 0, 0, canvas?.width || 0, canvas?.height || 0);
      };
    });
  }, []);

  useEffect(() => {
    if (canvasState.username.length > 0) {
      const socket = new WebSocket(`ws://localhost:5000/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(id || "");
      toolState.setTool(new Brash(ref.current, socket, id || ""));
      socket.onopen = () => {
        console.log("Подключение установлено");
        socket.send(
          JSON.stringify({
            id: id,
            username: canvasState.username,
            method: "connection",
          })
        );
      };
      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log(msg);
        switch (msg.method) {
          case "connection":
            console.log(`пользователь ${msg.username} присоединился`);
            break;
          case "draw":
            drawHandler(msg);
            break;
          case "finish":
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg: object) => {
    const figure = msg.figure;
    const ctx = canvasState.canvas?.getContext("2d") || null;
    switch (figure.type) {
      case "brush":
        Brash.draw(ctx, figure.x, figure.y);
        break;
      case "finish":
        ctx?.beginPath();
    }
  };

  const [username, setUsername] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(true);
  const handleConnect = () => {
    canvasState.setUsername(username);
    setmodal(false);
  };
  return (
    <div className={styles.canvas}>
      <Modal show={modal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type="text"
            name=""
            placeholder="Введите имя..."
            id=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConnect}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => {
          canvasState.pushToUndo(ref.current?.toDataURL() || "");
        }}
        onMouseUp={() => {
          axios
            .post("http://localhost:5000/image?id=" + canvasState.sessionId, {
              img: ref.current?.toDataURL() || "",
            })
            .then((response) => {
              console.log(response.data);
            });
        }}
        ref={ref}
        className={styles.canvasTag}
        width={600}
        height={400}
      />
    </div>
  );
});

export default Canvas;
