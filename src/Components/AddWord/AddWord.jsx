import { useState } from "react";
import styles from "./AddWord.module.scss";
import { useContext } from "react";
import { MyContext } from "../../Context/Context";
import { isValidForm } from "./validForm";

export default function AddWord() {
  const { addWord } = useContext(MyContext);

  const [stateAddWord, setStateAddWord] = useState({
    englishState: "",
    transcriptionState: "",
    russianState: "",
  });

  const [validInputs, setValidInputs] = useState(false);

  const setStateWord = (e) => {
    setStateAddWord({ ...stateAddWord, [e.target.name]: e.target.value });
  };

  const onClick = () => {
    if (isValidForm(stateAddWord.englishState, stateAddWord.transcriptionState, stateAddWord.russianState)) {
      setValidInputs(true);
    } else {
      setValidInputs(false);
      addWord(stateAddWord.englishState, stateAddWord.transcriptionState, stateAddWord.russianState);
      setStateAddWord({
        englishState: "",
        transcriptionState: "",
        russianState: "",
      });
    }
  };

  return (
    <div className={styles.table}>
      {validInputs && <p>Заполните все поля</p>}
      <input className={styles.word} placeholder="english" name="englishState" value={stateAddWord.englishState} onChange={setStateWord}></input>
      <input className={styles.word} placeholder="transcription" name="transcriptionState" value={stateAddWord.transcriptionState} onChange={setStateWord}></input>
      <input className={styles.word} placeholder="russian" name="russianState" value={stateAddWord.russianState} onChange={setStateWord}></input>
      <button className={styles.btn} onClick={onClick}>
        Сохранить
      </button>
    </div>
  );
}
