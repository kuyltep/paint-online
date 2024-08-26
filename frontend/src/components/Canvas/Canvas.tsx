import styles from "./styles.module.css";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brash from "../../tools/Brash";
const Canvas = observer(() => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    canvasState.setCanvas(ref.current);
    toolState.setTool(new Brash(ref.current));
  });
  return (
    <div className={styles.canvas}>
      <canvas
        onMouseDown={() => {
          canvasState.pushToUndo(ref.current?.toDataURL() || "");
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
