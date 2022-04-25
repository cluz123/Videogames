import React from 'react';
import '../styles/Paginado.css'

export default function Paginado({gamesPerPage, allGames, paginado}){
    let paginas = [];

    for(let i = 1 ; i <= Math.ceil(allGames/gamesPerPage) ; i++ ){
        paginas.push(i);
    }
    return (
        <div className='div-paginado'>
            <ul>
                {
                    paginas && paginas.map(p => {
                        return(<li key={p}>
                            <a onClick={() => paginado(p)}>{p}</a>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}