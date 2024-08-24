import { observer } from "mobx-react-lite";
import styles from "./styles.module.css";
import toolState from "../../store/toolState";
import Brash from "../../tools/Brash";
import canvasState from "../../store/canvasState";
import Rect from "../../tools/Rect";
import Circle from "../../tools/Circle";
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
        <button className={`${styles.toolbarBtn} ${styles.eraser}`}></button>
        <button className={`${styles.toolbarBtn} ${styles.line}`}></button>
        <input
          className={`${styles.toolbarBtn} ${styles.image}`}
          type="color"
          name=""
          id=""
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
