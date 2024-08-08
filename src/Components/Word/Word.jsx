import styles from './Word.module.scss'
import {useState, useEffect, useRef} from 'react'

export default function Word({meaning, transcription, translation, id, increaseCount}){

    const [translate, setTranslate] = useState(false);

    function showTranslate(){
        setTranslate(true);
        increaseCount()
    }

    const focusElem = useRef();
 
    useEffect(()=>{
        focusElem.current.focus()
    })

    useEffect(() => {
        setTranslate(false);
      }, [id]);

    return(
        <div className={styles.container_word}>
            <p className={styles.meaning}>{meaning}</p>
            <p className={styles.transcription}>{transcription}</p>
            {translate ?
            (<p className={styles.translation} ref={focusElem}>{translation}</p>) 
            : 
            (<button className={styles.btnCheck} onClick={showTranslate} ref={focusElem}>Проверить</button>)}
        </div>
    )
}