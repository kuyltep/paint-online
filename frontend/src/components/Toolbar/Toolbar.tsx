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
  return (
    <div className={styles.toolbar}>
      <div className={styles.leftBlock}>
        <button
          className={`${styles.toolbarBtn} ${styles.brush}`}
          onClick={() => toolState.setTool(new Brash(canvasState.canvas))}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            toolState.setColor(e.target.value);
          }}
        />
      </div>
      <div className={styles.rightBlock}>
        <button className={`${styles.toolbarBtn} ${styles.undo}`}></button>
        <button className={`${styles.toolbarBtn} ${styles.redo}`}></button>
        <button className={`${styles.toolbarBtn} ${styles.save}`}></button>
      </div>
    </div>
  );
});

export default Toolbar;
