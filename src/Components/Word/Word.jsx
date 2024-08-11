import styles from './Word.module.scss'
import {useState, useEffect, useRef} from 'react'


export default function Word({english, transcription, russian, id, increaseCount}){

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
            <p className={styles.meaning}>{english}</p>
            <p className={styles.transcription}>{transcription}</p>
            {translate ?
            (<p className={styles.translation} ref={focusElem}>{russian}</p>) 
            : 
            (<button className={styles.btnCheck} onClick={showTranslate} ref={focusElem}>Проверить</button>)}
        </div>
    )
}