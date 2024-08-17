import { useState, useEffect } from "react";
import styles from "./Row.module.scss";
import Input from "../Input/Input";
import { useContext } from "react";
import { MyContext } from "../../Context/Context";

export default function Row({ id, english, transcription, russian }) {
  const [edit, setEdit] = useState(false);

  const [state, setState] = useState({
    englishState: "",
    transcriptionState: "",
    russianState: "",
  });

  const { removeItem, saveEditWords } = useContext(MyContext);

  useEffect(() => {
    setState({ englishState: english, transcriptionState: transcription, russianState: russian });
  }, [english, transcription, russian]);

  const editWord = () => {
    setEdit(true);
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  function cancelEdit() {
    setEdit(false);
    setState({ englishState: english, transcriptionState: transcription, russianState: russian });
  }

  const onClick = () => {
    if (state.englishState === "" || state.transcriptionState === "" || state.russianState === "") {
      editWord;
    } else {
      saveEditWords(id, state.englishState, state.transcriptionState, state.russianState);
      setEdit(false);
    }
  };

  return (
    <div className={styles.container_row}>
      {edit ? (
        <div className={styles.row}>
          <Input name="englishState" value={state.englishState} onChange={onChange} />
          <Input name="transcriptionState" value={state.transcriptionState} onChange={onChange} />
          <Input name="russianState" value={state.russianState} onChange={onChange} />
          <div className={styles.container_btn}>
            <button className={styles.btn} onClick={onClick}>
              Сохранить
            </button>
            <button className={styles.btn} onClick={cancelEdit}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.row}>
          <p className={styles.word}>{english}</p>
          <p className={styles.word}>{transcription}</p>
          <p className={styles.word}>{russian}</p>
          <div className={styles.container_btn}>
            <button className={styles.btn} onClick={editWord}>
              Редактировать
            </button>
            <button className={styles.btn} onClick={() => removeItem(id)}>
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
