import styles from "./Game.module.scss";
import Word from "../../Components/Word/Word";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWords } from "../../store/slice/words";

export default function Game() {
  const [index, setIndex] = useState(0);

  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  function skrollNext() {
    if (index === words.length - 1) {
      return setIndex(0);
    }
    setIndex(index + 1);
  }

  function scrollBack() {
    if (index === 0) {
      return setIndex(words.length - 1);
    }
    setIndex(index - 1);
  }

  const words = useSelector(state => state.words.words);
  const {status, error} = useSelector(state => state.words)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getWords())
  }, [dispatch])

  return (
    <div className={styles.container_game}>
      {status === 'loading' && (
          <div className={styles.cssload_container}>
            <div className={styles.cssload_whirlpool}></div>
          </div>)}
          {error && <h2>Ошибка: {error}</h2>}
      <div className={styles.wrapper}>
        <button className={styles.btn} onClick={scrollBack}>
          &larr;
        </button>
        <Word {...words[index]} increaseCount={increaseCount} />
        <button className={styles.btn} onClick={skrollNext}>
          &rarr;
        </button>
      </div>
      <div className={styles.count_word}>
        <p>
          {index + 1}/{words.length}
        </p>
        <p>Выучено слов: {count}</p>
      </div>
    </div>
  );
}
