import React from "react";
import { getGenres, getPlatforms, createGame } from "../actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/Create.css';
import exp from "constants";

export default function Create() {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);    
    const allPlatforms = useSelector((state) => state.platforms);
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        platforms: [],
        genres: []
    });

    useEffect(() => {
        dispatch(getPlatforms());
        dispatch(getGenres());
    }, [dispatch]);

    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handlePlatforms(e){
        if(e.target.value !== 'Select Platforms' && !input.platforms.filter(p => p == e.target.value).length){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }

    function handleGenres(e){
        if(e.target.value !== 'Select Genres' && !input.genres.filter(g => g.name == e.target.value).length){
            setInput({
                ...input,
                genres: [...input.genres, {'name': e.target.value}]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        let expReg = /^[a-zA-Z0-9\:\-\s]{1,32}$/;
        if(!input.name){
            return alert('Enter game name');
        }else if(!expReg.test(input.name)){
            return alert('The name must only have letters, numbers, or the symbols in quotes separated by a comma "-, ,:"')
        }else if(!input.description){
            return alert('Enter description game');
        }else if(!input.platforms.length){
            return alert('Select at least 1 platform');
        }else if(input.rating && (input.rating < 0 || input.rating > 5)){
            return alert('Enter a rating from 0 to 5');
        }
        dispatch(createGame(input));
        alert('Game successfully added.');
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            image: "",
            platforms: [],
            genres: []
        });
    }

    return (
        <div className="div-main-create">
            <div className="div-principal-create">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2>Add Games</h2>
                    <input placeholder="Name" onChange={(e)=> handleInput(e)} type="text" name="name" value={input.name} />
                    <textarea placeholder="Description" className="Description" onChange={(e)=> handleInput(e)} type="text" name="description" value={input.description} />
                    <label>Released </label>
                    <input onChange={(e)=> handleInput(e)} type="date" name="released" value={input.released} />
                    <input placeholder="Rating" onChange={(e)=> handleInput(e)} type="text" name="rating" value={input.rating} />
                    <input placeholder="Image url" onChange={(e)=> handleInput(e)} type="text" name="image" value={input.image} />
                    <select onChange={(e)=> handlePlatforms(e)}>
                        <option>Select Platforms</option>
                        {
                            allPlatforms?.map(p => {
                                return (
                                    <option >{p}</option>
                                )
                            })
                        }
                    </select>
                    {input.platforms.length? (<ul>{
                    
                        input.platforms.map(p => {
                            return (
                                <li >{p}</li>
                            )
                        })
                    
                    }</ul>) : (<p></p>)}
                    <select onChange={(e)=> handleGenres(e)}>
                        <option>Select Genres</option>
                        {
                            allGenres?.map(g => {
                                return (
                                    <option key={g.id}>{g.name}</option>
                                )
                            })
                        }
                    </select>
                    {input.genres.length ? (
                    <ul>
                    {
                        input.genres.map(g => {
                            return (
                                <li>{g.name}</li>
                            )
                        })
                    }
                    </ul>): (<p></p>) }
                    <button className="create-button" type="submit">Add Game</button>
                    <Link to='/home'>
                        <button className="create-button">Back</button>
                    </Link>
                </form>
            </div>            
        </div>
    )
}