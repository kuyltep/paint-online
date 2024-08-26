import { observer } from "mobx-react-lite";
import toolState from "../../store/toolState";
import styles from "./styles.module.css";
const SettingsBar = observer(() => {
  return (
    <div className={styles.settingsBar}>
      <div className={styles.inputSection}>
        <p>Толщина линии:</p>
        <input
          className={styles.input}
          type="number"
          name=""
          id=""
          value={toolState.lineWidth}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            toolState.setLineWidth(+e.target.value);
          }}
        />
      </div>
    </div>
  );
});

export default SettingsBar;
