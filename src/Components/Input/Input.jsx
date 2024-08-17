import styles from "./Input.module.scss";
import { isValidEmptyInput } from "./validInput";

export default function Input({ name, value, onChange }) {
  return (
    <div className={styles.container_input}>
      {isValidEmptyInput(value) && <p className={styles.warning}>Заполните поле</p>}
      <input className={styles.input} type="text" name={name} value={value} onChange={onChange} required />
    </div>
  );
}
