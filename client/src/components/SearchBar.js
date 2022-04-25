import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSearch, searchByName } from "../actions";
import '../styles/Search.css';
import search from '../styles/img/search.png';

export default function SearchBar (){
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState("a");
    let videogamesFind = useSelector((state) => state.videogames);

    function handleInput (e) {
        setSearchName(e.target.value);        
    }

    function handleSubmit (e){
        e.preventDefault();
        dispatch(restoreSearch());
        dispatch(searchByName(searchName));
    }


    return (
        <div className="div-searchbar">
            <input className="search" type='text' placeholder="Search..." onChange={(e) => handleInput(e)} />
            <button className="search-button" type="submit" onClick={(e) => handleSubmit(e)}><img className="search-img" src={search} /></button>
        </div>
    )
}