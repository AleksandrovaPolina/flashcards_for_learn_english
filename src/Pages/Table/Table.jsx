import { useState } from 'react'
import Row from '../../Components/Row/Row'
import styles from './Table.module.scss'

export default function Table({words, setWords}){

    function removeItem(id){
        setWords(words.filter((word)=>word.id!==id))
    }

    function saveEditWords(id, meaning, transcription, translation){
            setWords(
                words.map((word)=>{
                    if(word.id===id){
                        return{
                            meaning:meaning,
                            transcription:transcription,
                            translation:translation,
                        }
                    }
                    return word;
                })
            )
    }

    return(
        <div className={styles.container_table}>
            <div className={styles.table}>
            {words.map((item)=>(
                <Row
                key={item.id}
                id={item.id}
                meaning={item.meaning}
                transcription={item.transcription}
                translation={item.translation}
                setWords={setWords}
                removeItem={removeItem}
                saveEditWords={saveEditWords}
                />
            ))}
            </div>
        </div>
    )
}