import { observer } from "mobx-react-lite";
import styles from "./styles.module.css";
import toolState from "../../store/toolState";
import Brash from "../../tools/Brash";
import canvasState from "../../store/canvasState";
import Rect from "../../tools/Rect";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
const Toolbar = observer(() => {
  const download = () => {
    const dataUrl = canvasState.canvas?.toDataURL() || "";
    const a = document.createElement("a");
    a.href = dataUrl;
    document.body.appendChild(a);
    a.download = canvasState.sessionId + ".jpg";
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftBlock}>
        <button
          className={`${styles.toolbarBtn} ${styles.brush}`}
          onClick={() =>
            toolState.setTool(
              new Brash(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
            )
          }
        ></button>
        <button
          className={`${styles.toolbarBtn} ${styles.rect}`}
          onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
        ></button>
        <button
          className={`${styles.toolbarBtn} ${styles.circle}`}
          onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
        ></button>
        <button
          className={`${styles.toolbarBtn} ${styles.eraser}`}
          onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
        ></button>
        <button
          className={`${styles.toolbarBtn} ${styles.line}`}
          onClick={() => toolState.setTool(new Line(canvasState.canvas))}
        ></button>
        <input
          className={`${styles.toolbarBtn} ${styles.image}`}
          type="color"
          name=""
          id=""
          value={toolState.color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            toolState.setColor(e.target.value);
          }}
        />
      </div>
      <div className={styles.rightBlock}>
        <button
          className={`${styles.toolbarBtn} ${styles.undo}`}
          onClick={() => canvasState.undo()}
        ></button>
        <button
          className={`${styles.toolbarBtn} ${styles.redo}`}
          onClick={() => canvasState.redo()}
        ></button>
        <button
          className={`${styles.toolbarBtn} ${styles.save}`}
          onClick={() => download()}
        ></button>
      </div>
    </div>
  );
});

export default Toolbar;
