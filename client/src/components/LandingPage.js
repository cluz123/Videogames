import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'
import back from '../styles/img/battle.mp4'

export default function LandingPage() {
    return (
        <div className='div-main-land'>
        <div className='react-player-container'>
            <div className='react-player'>
                <video src={back} muted autoPlay loop ></video>
            </div>
        </div>            
            <div className='div-main__in'>
                <div className='div-main__bar'>
                    <h2>ProjectGames</h2>
                    <a href='https://github.com/cluz123/'>GitHub</a>
                    <a href='https://www.linkedin.com/in/pablo-matias-lizarraga/'>LinkedIn</a>
                </div>
                <h1>Find your favorite games here!</h1>
                <h3>Over 100 of the best games waiting you to join in</h3>
                <Link className='div-main__link' to='/home'>
                    <button>Join in!</button>
                </Link>
            </div>
        </div>
    )
}