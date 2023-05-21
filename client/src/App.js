import React from 'react';
import { createContext, useEffect,useState } from 'react';
import axios from "axios"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Searchresult from './pages/SearchResult/Searchresult';
import Detail from './pages/Detail/Detail';
import Watchlist from './pages/Watchlist/Watchlist';
import Login from './pages/login/Login';
import  Register  from './pages/Register/Register';
import Review from './pages/Review/Review';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './pages/Navbar/Navbar';
import TvShow from './pages/TvShow/TvShow';
import Movie from './pages/Movie/Movie';
import {MemoCard} from './pages/Card/Card';
import Cast from './pages/Cast/Cast';

export const DarkTheme=createContext()  

 const App=()=> {
  const [test,settest]=useState("kill")
    const [dark,setdark]=React.useState(true)
  
  const darkTheme = createTheme({
    palette: {
      mode: dark?'dark':"light",
    },
  });
    const change=()=>{
      if(dark){
        setdark(false)
      }
      else{
        setdark(true)
      }
      
      }

  return (
    <DarkTheme.Provider value={{change}}>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="App">
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home value={test}/>}/>
        <Route path="/search" element={<Searchresult/>}/>
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/watchlist" element={<Watchlist/>}/>
        <Route path="/tvshow" element={<TvShow/>}/>
        <Route path="/movie" element={<Movie/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/review" element={<Review/>}/>
        <Route path="/card" element={<MemoCard/>}/>
        <Route path="/cast" element={<Cast/>}/>

      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>

    </DarkTheme.Provider>

  );
}

export default App;
