import {Home, Game, Table, Error} from '../Pages'
import { Routes, Route } from "react-router-dom";
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'


function App() {


  return(
    <div>
        <header>
          <Header/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/game' element={<Game/>}/>
            <Route path='/table' element={<Table/>}/>
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
