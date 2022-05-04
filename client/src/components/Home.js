import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames, filterByGenre, filterCreated, sortGames } from '../actions';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Paginado from '../components/Paginado';
import SearchBar from './SearchBar';
import '../styles/Home.css';
import back from '../styles/img/back.jpg';
import sort from '../styles/img/sort.png';
import filter from '../styles/img/filter.png';
import search from '../styles/img/search.png';
import db from '../styles/img/db.png';
import loading from '../styles/img/loading.gif';
import updown from '../styles/img/updown.png';



export default function Home(){

    // Traer todos los juegos y generos
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames);
    const allGenres = useSelector((state) => state.genres);
    
    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch]);


    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }    

    
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(6);
    const [orderGames, setOrderGames] = useState(false);
    const indexOfLastCharacter = currentPage * gamesPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstCharacter, indexOfLastCharacter);


    const paginado = (paginas) => {
        setCurrentPage(paginas)
    }    

    function handleFilterStatus(e){
        setCurrentPage(1);
        dispatch(filterByGenre(e.target.value));
    }

    function handleCreated(e){
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e){
        dispatch(sortGames(e.target.value));
        setCurrentPage(1);
        setOrderGames(e.target.value)
    }
    
    function upDown(e){
        e.preventDefault();
        let current = window.scrollY;
        if(current <= 50){
            return window.scroll(0,800);
        }else{
            return window.scroll(0,0);
        }
    }

    return (
        <div className='div-main-home'>
            <nav>
                <h2>ProjectGames</h2>                
                <button className='nav__both' onClick={(e) => handleClick(e)}>RELOAD GAMES</button>
                <Link className='nav__both nav__link' to='/create'>Add game</Link>
            </nav>
            <div className='div-main-home__divimg'>
                <h3>Add your games to our page</h3>
                <h2>Enjoy the gamers favorite page!</h2>
                <div className='div-main-info'>
                    <div className='ico-div'>
                        <img className='sort' src={sort} />
                        <span className='ico-span'>Ascending/Descending Sort </span>
                    </div>
                    <div className='ico-div'>
                        <img className='ico filter' src={filter} />
                        <span>Filter by Category </span>
                    </div>
                    <div className='ico-div'>
                        <img className='ico search' src={search} />
                        <span>Search by Name </span>
                    </div>
                    <div className='ico-div'>
                        <img className='ico db' src={db} />
                        <span>Added Games </span>
                    </div>
                    
                </div>
            </div>
            <img className='div-main-img' src={back} height='600px'/>
            <div className='div-bottom'>
                <div className='div-search'>
                    <SearchBar />
                </div>
                <div className='div-form'>

                    {!currentGames.length ? (<img className='img-loading' src={loading} />) : (
                        <div>
                            
                    
                    <select onChange={(e) => handleSort(e)}>
                        <option value=''>Sort by</option>
                        <option value='asc-name'>Ascending name</option>
                        <option value='des-name'>Descending name</option>
                        <option value='asc-rating'>Ascending rating</option>
                        <option value='des-rating'>Descending rating</option>
                    </select>
                    <select onChange={(e) => handleFilterStatus(e)}>
                        <option value='' >Filter by genre</option>
                        {allGenres?.map(g => {
                            return (
                                <option key={g.id} value={g.name}>{g.name}</option>
                            )
                        })}
                    </select>
                    <select onChange={(e) => handleCreated(e)}>
                        <option value='all'>All</option>
                        <option value='db'>Created</option>
                        <option value='api'>Existing</option>
                    </select>
                    <Paginado gamesPerPage={gamesPerPage} allGames={allGames.length} paginado={paginado} />
                    </div>
                    ) }
                    <div className='div-container'>
                    {
                        currentGames?.map(g => {
                            return (
                                <div key={g.id} className='home-card-div'>
                                    <Link className='card-link' to={"/home/" + g.id} >
                                        <Card name={g.name} image={g.image} genres={g.genres} rating={g.rating} />
                                    </Link>
                                </div>                                
                          )}
                        )
                    }
                    </div>
                </div>
            </div>
            
                <button onClick={(e) => upDown(e) } className='button-updown'><img src={updown}/></button>
            
            
        </div>
    )
}