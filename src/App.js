import { Landing, Home } from "./Pages";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { MainContainer, DefaultView } from './Components/HomePage'


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing/>} path="/" />
        <Route element={<Home/>} path="/home">
          <Route element={<DefaultView/>} path=""/>
          <Route element={<MainContainer/>} path=":chatId"/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
