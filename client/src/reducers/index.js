
const initialState = {
    videogames: [],
    allGames: [],
    details: [],
    platforms: []
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_VIDEOGAMES': 
            return {
                ...state,
                videogames: action.payload,
                allGames: action.payload
            }
            
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'FILTER_BY_GENRE':
            const filteredVideogames = action.payload == '' ? state.allGames : state.allGames.filter(v => {
               let current = v.genres.filter(g => g.name == action.payload);
               if(current.length){
                   return v;
               }
            });            
            return {
                ...state,
                videogames: filteredVideogames
            }
        case 'FILTER_CREATED':
            const filterCreated = action.payload == 'db' ? state.allGames.filter(v => v.createdOnDb) : state.allGames.filter(v => !v.createdOnDb);            
             return {
                 ...state,
                 videogames: action.payload == '' ? state.allGames : filterCreated
             }
        case 'SORT_GAMES':
            let newGamesArr;
            switch(action.payload){
                case 'asc-name':
                    newGamesArr = state.allGames.sort((a,b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()){
                            return -1
                        }else if(a.name.toLowerCase() > b.name.toLowerCase()){
                            return 1
                        }else{
                            return 0
                        }
                    });
                    return {
                        ...state,
                        videogames: newGamesArr
                    };
                case 'des-name':
                    newGamesArr = state.allGames.sort((a,b) => {
                
                        if(a.name.toLowerCase() < b.name.toLowerCase()){
                            return 1
                        }else if(a.name.toLowerCase() > b.name.toLowerCase()){
                            return -1
                        }else{
                            return 0
                        }                
                    });
                    return {
                        ...state,
                        videogames: newGamesArr
                    };
                case 'asc-rating':                    
                    newGamesArr = state.allGames.sort((a,b) => {
                        if(a.rating < b.rating){
                            return 1
                        }else if(a.rating > b.rating){
                            return -1
                        }else{
                            return 0
                        }
                    });     
                    return {
                        ...state,
                        videogames: newGamesArr
                    };
                case 'des-rating':
                    newGamesArr = state.allGames.sort((a,b) => {
                
                        if(a.rating < b.rating){
                            return -1
                        }else if(a.rating > b.rating){
                            return 1
                        }else{
                            return 0
                        }                
                    });     
                    return {
                        ...state,
                        videogames: newGamesArr
                    };
                    case 'asc-rating3':                    
                        newGamesArr = state.allGames.sort((a,b) => {
                            if(a.rating < b.rating){
                                return 1
                            }else if(a.rating > b.rating){
                                return -1
                            }else{
                                return 0
                            }
                        });     
                        return {
                            ...state,
                            videogames: newGamesArr.slice(0,3)
                        };
                default: 
                    newGamesArr = state.allGames; 
                    return {
                        ...state,
                        videogames: newGamesArr
                    };        
            }
        case 'GET_DETAILS': 
            return {
                ...state,
                details: action.payload
            }
        case 'RESET_DETAILS':
            return {
                ...state,
                details: []
            }
        case 'CREATE_GAME':
            return {
                ...state
            }
        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }
        case 'SEARCH_BY_NAME':
            if(action.payload == 'error'){
                alert('Game not found')
                console.log(action.payload);
            }else{
                return {
                    ...state,
                    videogames: action.payload
                }
            }
        case 'RESTORE_SEARCH':
            return {
                ...state,
                videogames: state.allGames
            }
        default: return state            
    }
}

export default rootReducer;