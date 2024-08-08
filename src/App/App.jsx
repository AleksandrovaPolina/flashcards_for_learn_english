import {Home, Game, Table, Error} from '../Pages'
import { Routes, Route } from "react-router-dom";
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import data from '../data.json'
import {useState} from 'react'


function App() {

  const [words, setWords] = useState(data);

  return(
    <div>
        <header>
          <Header/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/game' element={<Game words={words} setWords={setWords}/>}/>
            <Route path='/table' element={<Table words={words} setWords={setWords}/>}/>
            <Route path='*' element={<Error/>}/>
          </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
    </div>
  )
}

export default App
