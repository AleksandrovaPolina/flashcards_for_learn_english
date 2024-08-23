import { useEffect } from "react";
import Row from "../../Components/Row/Row";
import styles from "./Table.module.scss";
import AddWord from "../../Components/AddWord/AddWord";
import { useDispatch, useSelector } from "react-redux";
import { getWords } from "../../store/slice/words";

export default function Table() {

  const words = useSelector(state => state.words.words);
  const {status, error} = useSelector(state => state.words)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getWords())
  }, [dispatch])

  return (
    <div className={styles.container_table}>
      <div className={styles.table}>
        <AddWord />
        {status === 'loading' && (
          <div className={styles.cssload_container}>
            <div className={styles.cssload_whirlpool}></div>
          </div>)}
          {error && <h2>Ошибка: {error}</h2>}
        {words.map((item) => (
          <Row key={item.id} id={item.id} english={item.english} transcription={item.transcription} 
          russian={item.russian} />
        ))}
      </div>
    </div>
  );
}