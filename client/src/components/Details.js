import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, resetDetails } from '../actions';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import loading from '../styles/img/loading.gif';
import '../styles/Details.css';



export default function Details() {
    const allDetails = useSelector((state) => state.details);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails());
        return () => {
            dispatch(resetDetails());
        }
    }, [dispatch])

    return (
        <div className='div-main-details'>
            <div className='div-details'>{allDetails.name ?
                <div className='div-principal'>
                    <div className='details-name'>
                        <p className='name-title'>{allDetails.name}</p>
                        <p><span className='released'>Released:</span> <span className='released-date'>{allDetails.released}</span></p>
                        <p><span className='rating'>Rating:</span> <span className='rating-points'>{allDetails.rating}</span></p>
                        <p className='desc-title'>About</p>
                        <div className='details-description'> {
                            parse(allDetails.description)
                        }</div>
                    </div>
                    <div className='details-img' >
                        <img src={allDetails.image} />
                        <p className='platform-title'>Platforms</p>
                        <div className='details-platforms'>{allDetails.createdOnDb ? allDetails.platforms?.map(p => {
                            return (<div key={allDetails.platforms.indexOf(p) * 20} className='platforms'>{p}</div>);
                        }) : allDetails.platforms?.map(p => {
                            return (<div className='platforms'>{p.name}</div>);
                        })}</div>
                        <p className='genre-title'>Categories</p>
                        <div className='details-genres'>{allDetails.genres?.map(g => {
                            return (<div key={allDetails.genres.indexOf(g) * 10} className='genres'>{g.name}</div>)
                        })}</div>
                    </div>
                </div> : (<img className='img-loading' src={loading} />)}
                <div>
                    <Link to='/home'>
                        <button className='back-button'>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}