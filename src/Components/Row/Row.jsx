import { useState, useEffect } from 'react';
import styles from './Row.module.scss'
import {isValidEmptyRow} from './validForm'

export default function Row({meaning, transcription, translation, removeItem, id, saveEditWords}){

    const [edit, setEdit] = useState(false);
    
    const [state, setState] = useState({
        meaningState: '',
        transcriptionState: '',
        translationState: ''
    })

    useEffect(()=>{
        setState({meaningState: meaning,
                transcriptionState: transcription,
                translationState: translation});
    }, [meaning, transcription, translation])

    const editWord = (e) =>{
        setEdit(true);
        setState({...state, [e.target.name]: e.target.value})
    }

    function cancelEdit(){
        setEdit(false)
    }


    return(
        <div className={styles.container_row}>
            {edit? 
            (<div className={styles.row}>
                {isValidEmptyRow(state.meaningState, state.transcriptionState, state.translationState) && <p className={styles.warning}>Заполните все поля</p>}
                <input type="text" name='meaningState' value={state.meaningState} onChange={editWord} required/>
                <input type="text" name='transcriptionState' value={state.transcriptionState} onChange={editWord} required/>
                <input type="text" name='translationState' value={state.translationState} onChange={editWord} required/>
                <div className={styles.container_btn}>
                <button className={styles.btn} onClick={()=>{isValidEmptyRow(state.meaningState, state.transcriptionState, state.translationState)? editWord : saveEditWords(id, state.meaningState, state.transcriptionState, state.translationState);
                }}>Сохранить</button>
                <button className={styles.btn} onClick={cancelEdit}>Отмена</button>
                </div>
            </div>)
            :
            (<div className={styles.row}>
                <p className={styles.word}>{meaning}</p>
                <p className={styles.word}>{transcription}</p>
                <p className={styles.word}>{translation}</p>
                <div className={styles.container_btn}>
                <button className={styles.btn} onClick={editWord}>Редактировать</button>
                <button className={styles.btn} onClick={()=>removeItem(id)}>Удалить</button>
                </div>
            </div>)}
        </div>
    )
}