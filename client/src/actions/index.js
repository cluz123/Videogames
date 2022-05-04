import axios from 'axios';


export function getVideogames(){ 
    return async (dispatch)=>{
        let json = await axios.get('http://localhost:3001/videogames')
        console.log(json.data)
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })        
    }    
}

export function getGenres(){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function filterByGenre(payload){
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function sortGames(payload){
    return {
        type: 'SORT_GAMES',
        payload
    }
}

export function getDetails(){
    let path = window.location.pathname.slice(6);
    return async (dispatch)=>{
        let json = await axios.get('http://localhost:3001/videogames/' + path);
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
}

export function resetDetails (){
    return {
        type: 'RESET_DETAILS'
    }
}

export function createGame(payload){
    return async () => {
        let json = await axios.post('http://localhost:3001/videogames', payload);
        return json;        
    }
}

export function getPlatforms(){
    return async (dispatch)=>{
        let json = await axios.get('http://localhost:3001/platforms/');
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
}

export function searchByName(name){
    return async (dispatch)=>{
    let json = await axios.get('http://localhost:3001/videogames?name=' + name);
        return dispatch({
            type: 'SEARCH_BY_NAME',
            payload: json.data
        })
    }
    
}

export function restoreSearch(){
    return {
        type: 'RESTORE_SEARCH'
    }
}