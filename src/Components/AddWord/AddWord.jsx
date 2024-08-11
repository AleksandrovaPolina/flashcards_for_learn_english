import { useState } from 'react'
import styles from './AddWord.module.scss'


export default function AddWord() {

    const [stateAddWord, SetStateAddWord] = useState({
            englishState: '',
            transcriptionState: '',
            russianState: ''
    })

    const setStateWord = (e) =>{
        SetStateAddWord({...stateAddWord, [e.target.name]: e.target.value})
    }

    function addWord(englishState, transcriptionState, russianState){
        fetch('/api/words/add', {
            method: 'POST',
            headers: {
                "Content-type":"application/json;charset=UTF-8",
            },
            body:JSON.stringify({
                english:englishState,
                transcription:transcriptionState,
                russian:russianState,
                tags:"",
                tags_json: "" 
            }),
        })
            .then((response)=>{
                if(!response.ok){
                    console.log(response)
                }console.log(response)
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    


    return (
        <div className={styles.table}>
        <input className={styles.word} placeholder='english' name='englishState' value={stateAddWord.englishState} onChange={setStateWord} ></input>
        <input className={styles.word} placeholder='transcription' name='transcriptionState' value={stateAddWord.transcriptionState} onChange={setStateWord}></input>
        <input className={styles.word} placeholder='russian' name='russianState' value={stateAddWord.russianState} onChange={setStateWord}></input>
        <button className={styles.btn} onClick={()=>addWord(stateAddWord.englishState, stateAddWord.transcriptionState, stateAddWord.russianState)}>Сохранить</button>
        </div>
    )
}