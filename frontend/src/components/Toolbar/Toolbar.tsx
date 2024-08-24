import styles from "./styles.module.css";
const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.leftBlock}>
        <button className={`${styles.toolbarBtn} ${styles.brush}`}></button>
        <button className={`${styles.toolbarBtn} ${styles.rect}`}></button>
        <button className={`${styles.toolbarBtn} ${styles.circle}`}></button>
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
};

export default Toolbar;
