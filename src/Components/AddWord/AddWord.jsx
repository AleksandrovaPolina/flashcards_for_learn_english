import { useState } from 'react'
import styles from './AddWord.module.scss'
import { useContext } from 'react'
import { MyContext }  from '../../Context/Context'
import {isValidForm} from './validForm'

export default function AddWord() {

    const {addWord} = useContext(MyContext);

    const [stateAddWord, SetStateAddWord] = useState({
            englishState: '',
            transcriptionState: '',
            russianState: ''
    })

    const [validInputs, setValidInputs] = useState(false)

    const setStateWord = (e) =>{
        SetStateAddWord({...stateAddWord, [e.target.name]: e.target.value})
    }

    function isValidForm(englishState, transcriptionState, russianState){
        if(englishState.trim() === '' || transcriptionState.trim() === '' || russianState.trim() === ''){
            setValidInputs(true);console.log('setValidInputs(true)')
        }else setValidInputs(false);
    }


    return (
        <div className={styles.table}>
            {validInputs && <p>Заполните все поля</p>}
        <input className={styles.word} placeholder='english' name='englishState' value={stateAddWord.englishState} onChange={setStateWord} ></input>
        <input className={styles.word} placeholder='transcription' name='transcriptionState' value={stateAddWord.transcriptionState} onChange={setStateWord}></input>
        <input className={styles.word} placeholder='russian' name='russianState' value={stateAddWord.russianState} onChange={setStateWord}></input>
        <button className={styles.btn} onClick={()=>{isValidForm(stateAddWord.englishState, stateAddWord.transcriptionState, stateAddWord.russianState);
        addWord(stateAddWord.englishState, stateAddWord.transcriptionState, stateAddWord.russianState); 
        SetStateAddWord({englishState : '', transcriptionState : '', russianState : ''})}}>Сохранить</button>
        </div>
    )
}