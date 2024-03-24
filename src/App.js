import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItems from './Components/AddItems/AddItems';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import EditItems from './Components/EditItems/EditItems';
import 'react-toastify/dist/ReactToastify.css';
const productApi = 'https://dummyjson.com/products';
const productContext= createContext();

function App() {
  // const [product, setproduct] = useState([])
  const [data, setdata] = useState([])
  const [selected_data, setselected_data] = useState([])
  // const [hide, sethide] = useState(true)

  useEffect(() => {
    axios.get(productApi).then((response) => {setdata(response.data.products)})
  }, [])
  
  return (
    
    <div className="App">

     <productContext.Provider value={{data,setdata,selected_data,setselected_data}}>
     <BrowserRouter>

     <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='/Home' element={<Home/>}/> 
     <Route path='/AddItems' element={<AddItems/>}/> 
     <Route path='/EditItems' element={<EditItems/>}/> 
     </Routes>

     </BrowserRouter>
     </productContext.Provider>
     
    </div>
    
  );
}

export default App;
export {productContext};


