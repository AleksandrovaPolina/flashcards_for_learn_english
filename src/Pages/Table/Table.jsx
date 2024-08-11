import Row from '../../Components/Row/Row'
import styles from './Table.module.scss'
import AddWord from '../../Components/AddWord/AddWord'
import { useContext, useEffect } from 'react'
import {dataContext}  from '../../Context/Context'

export default function Table(){

    const {words, setWords} = useContext(dataContext);
    console.log(words)


    function removeItem(id){
        fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
                method: 'POST',
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body:JSON.stringify({}),
            })
            .then((response)=>{
                if(!response.ok){
                    throw new Error('Server response ne ok')
                } console.log(response)
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    function saveEditWords(id, english, transcription, russian){

        fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                "Content-type":"application/json;charset=UTF-8",
            },
            body:JSON.stringify({
                id:id,
                english:english,
                transcription:transcription,
                russian:russian,
                tags:"",
                tags_json: "" 
            }),
        })
            .then((response)=>{
                if(!response.ok){
                    throw new Error('Server response ne ok')
                }console.log(response.json())
            })
            .catch((e)=>{
                console.log(e)
            })

    }

    return(
        <div className={styles.container_table} >
            <div className={styles.table}>
            <AddWord/>
            {words.map((item)=>(
                <Row
                key={item.id}
                id={item.id}
                english={item.english}
                transcription={item.transcription}
                russian={item.russian}
                removeItem={removeItem}
                saveEditWords={saveEditWords}
                />)
            )}
            </div>
        </div>
    )
}


//редактирование слова
//setWords(
  //  words.map((word)=>{
    //    if(word.id===id){
      //      return{
        //        id:id,
          //      english:english,
            //    transcription:transcription,
              //  russian:russian
  //          }
  //      }
  //      return word;
//    }))