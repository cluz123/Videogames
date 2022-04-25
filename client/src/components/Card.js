import React from 'react';
import '../styles/Card.css'

export default function Card({ name, image, genres, rating }){
    let space = '\u00A0';
    return (
        <div className='div-card'>
            <img src={image} alt='img not found' width='350px' height='200px'/>
            <h3 className='div-card__name'>{name}</h3>
            <h5 className='div-card__name'> {rating}</h5>
            <div className='div-category'>
                <h5 className='card-category'>Category:</h5>
                <div className='card-category__div'>
                    {genres.map(g => {
                        return genres.indexOf(g) !== genres.length-1 ? (
                            <h5 key={genres.indexOf(g)} className='div-card__genre'> {`${g.name},${space}`}</h5>
                            ) 
                            : (
                                <h5 key={genres.indexOf(g)} className='div-card__genre'> {g.name + '.'} </h5>
                                )})}
                </div>
            </div>
        </div>
    )
}