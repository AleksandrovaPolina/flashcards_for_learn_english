import ButtonSave from '../Buttons/ButtonSave'
import ButtonEdit from '../Buttons/ButtonEdit'
import ButtonDelete from '../Buttons/ButtonDelete'
import styles from '../Table/table.module.css'

export default function AddWord() {
    return (
        <div className={styles.table}>
        <input className={styles.word} placeholder='meaning'></input>
        <input className={styles.word} placeholder='transcription'></input>
        <input className={styles.word} placeholder='translation'></input>
        <input className={styles.word} placeholder='theme'></input>
        <div className={styles.btn}><ButtonSave/><ButtonEdit/><ButtonDelete/></div>
        </div>
    )
}