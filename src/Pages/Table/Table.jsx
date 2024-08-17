import Row from "../../Components/Row/Row";
import styles from "./Table.module.scss";
import AddWord from "../../Components/AddWord/AddWord";
import { useContext } from "react";
import { MyContext } from "../../Context/Context";

export default function Table() {
  const { words, isLoading } = useContext(MyContext);

  return (
    <div className={styles.container_table}>
      <div className={styles.table}>
        <AddWord />
        {isLoading === true && (
          <div className={styles.cssload_container}>
            <div className={styles.cssload_whirlpool}></div>
          </div>
        )}
        {words.map((item) => (
          <Row key={item.id} id={item.id} english={item.english} transcription={item.transcription} russian={item.russian} />
        ))}
      </div>
    </div>
  );
}
