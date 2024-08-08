import styles from './Game.module.scss'
import Word from '../../Components/Word/Word'
import {useState} from 'react'

export default function Game({words, setWords}){

    const [index, setIndex] = useState(0);

    const [count,setCount] = useState(0);

    function increaseCount(){
        setCount(count + 1)
    }

    function skrollNext(){
        if (index === words.length - 1) {
            return setIndex(0)
            }
        setIndex(index + 1)
    }

    function scrollBack(){
        if (index === 0) {
            return setIndex(words.length - 1)
            }
        setIndex(index - 1)
    }

    return(
        <div className={styles.container_game}>
            <div className={styles.wrapper}>
                <button className={styles.btn} onClick={scrollBack}>&larr;</button>
                <Word {...words[index]} increaseCount={increaseCount}/>
                <button className={styles.btn} onClick={skrollNext}>&rarr;</button>
                </div>
                <div className={styles.count_word}>
                        <p>{index+1}/{words.length}</p>
                    <p>Выучено слов: {count}</p>
                </div>
        </div>
    )
}