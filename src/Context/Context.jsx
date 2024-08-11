import { createContext, useState, useEffect } from "react";


export const dataContext = createContext();

export function DataContextProvider({children}){

    const [words, setWords] = useState([]);

    useEffect(()=>{
        fetch('http://itgirlschool.justmakeit.ru/api/words')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                } return response.json(); 
            })
            .then((response) => {
                setWords(response);
            })
            .catch(error => console.log(error));
}, [])

    const value = {words, setWords};

    if(words.length === 0){
        return <h1>Loading...</h1>
    }

    return(
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    )
}