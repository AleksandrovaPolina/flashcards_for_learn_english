import { useState, useEffect } from 'react';
import styles from './Row.module.scss'
import Input from '../Input/Input'

export default function Row({id, english, transcription, russian, removeItem, saveEditWords}){

    const [edit, setEdit] = useState(false);
    
    const [state, setState] = useState({
        englishState: '',
        transcriptionState: '',
        russianState: ''
    })

    useEffect(()=>{
        setState({englishState: english,
                transcriptionState: transcription,
                russianState: russian});
    }, [english, transcription, russian])

    const editWord = (e) =>{
        setEdit(true);
        setState({...state, [e.target.name]: e.target.value})
    }

    function cancelEdit(){
        setEdit(false);
        setState({englishState: english,
                transcriptionState: transcription,
                russianState: russian})
    }

    return(
        <div className={styles.container_row}>
            {edit? 
            (<div className={styles.row}>
                <Input name='englishState' value={state.englishState} onChange={editWord}/>
                <Input name='transcriptionState' value={state.transcriptionState} onChange={editWord}/>
                <Input name='russianState' value={state.russianState} onChange={editWord}/>
                <div className={styles.container_btn}>
                <button className={styles.btn} onClick={()=>{saveEditWords(id, state.englishState, state.transcriptionState, state.russianState);
                }}>Сохранить</button>
                <button className={styles.btn} onClick={cancelEdit}>Отмена</button>
                </div>
            </div>)
            :
            (<div className={styles.row}>
                <p className={styles.word}>{english}</p>
                <p className={styles.word}>{transcription}</p>
                <p className={styles.word}>{russian}</p>
                <div className={styles.container_btn}>
                <button className={styles.btn} onClick={editWord}>Редактировать</button>
                <button className={styles.btn} onClick={()=>removeItem(id)}>Удалить</button>
                </div>
            </div>)}
        </div>
    )
}