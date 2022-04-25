const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    let apiTotal = [];
    let apiUrl;
    for(let i = 1 ; apiTotal.length < 100 ; i++){
        if(i == 1){
            apiUrl = await axios.get('https://api.rawg.io/api/games?key=' + API_KEY);
        }else{
            apiUrl = await axios.get('https://api.rawg.io/api/games?key=' + API_KEY + '&page=' + i);
        }
        let apiInfo = apiUrl.data.results.map(r => {
            return {
                id: r.id,
                name: r.name,
                description: r.description,
                released: r.released,
                rating: r.rating,
                platforms: r.platforms.map(p => {
                    return {
                        name: p.platform.name
                    }
                }),
                image: r.background_image,
                genres: r.genres.map(g => {
                    return {
                        name: g.name
                    }
                })
            }
        });
        apiTotal = [...apiTotal,...apiInfo];
        
    }
    
    return apiTotal;
}

const getDbInfo = async () => {
    return await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['id','name']
            },
            through: {
                attributes: []
            }
        }
    )
}

const getTotalInfo = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    return apiInfo.concat(dbInfo);
}

router.get('/videogames', async (req, res) => {
    const name = req.query.name;

    let infoTotal = await getTotalInfo();

    if(name){
        let videogameList = infoTotal.filter(v => v.name.toLowerCase().includes(name.toLowerCase()));
        if(videogameList.length){
            let newList = videogameList.map(v => {
                return {
                    id: v.id,
                    name: v.name,
                    image: v.image,
                    genres: v.genres,
                    createdOnDb: v.createdOnDb
                }
            });
            videogameList.length < 15 ? res.send(newList) : res.send(newList.slice(0 , 15));
        } else{
            res.status(404).send('Videojuego no encontrado.');
        } 
    }else{
        let newList = infoTotal.map(v => {
            return {
                id: v.id,
                name: v.name,
                image: v.image,
                rating: v.rating,
                genres: v.genres,
                createdOnDb: v.createdOnDb
            }
        })
        res.send(newList);        
    }
})


router.get('/videogames/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    let infoTotal = await getTotalInfo();
    let videogameDetails = infoTotal.filter(v => v.id == idVideogame)[0];

    if(!videogameDetails.createdOnDb){
        const descriptionGame = await axios.get('https://api.rawg.io/api/games/' + idVideogame + '?key=' + API_KEY);
        videogameDetails.description = descriptionGame.data.description;
    }

    res.send(videogameDetails);

});


const getGenres = async () => {
    const apiUrl = await axios.get('https://api.rawg.io/api/genres?key=' + API_KEY);
    const genresInfo = apiUrl.data.results.map(g => {
        return {
            id: g.id,
            name: g.name
        }
    });
    return genresInfo;        
}

router.get('/genres', async (req, res) => {
    
    let genresDb = await Genre.findAll({
        attributes: ['id','name']
    });

    if(!genresDb.length){
        let gettedGenres = await getGenres();
        let addedGenres = async () => {
            return await gettedGenres.map(async g => { 
                return await Genre.findOrCreate({
                    where: { name: g.name },
                    defaults: {
                      id: g.id,
                      name: g.name
                    }
                  });
            })
        }
        addedGenres();
        genresDb = await Genre.findAll({
            attributes: ['id','name']
        });
    }
    
    res.send(genresDb);  

})


router.post('/videogames', async (req, res) => {
    const { name, description, released, rating, platforms, image, genres } = req.body;
    
    const [videogame, created] = await Videogame.findOrCreate({
        where: {
            name: name
        },
        defaults: {
            name: name,
            description: description,
            released: released.length ? released : "",
            rating: rating.length ? rating : 0,
            platforms: platforms,
            image: image.length ? image : "",
        }
    })
    if(genres.length){
        
        genres.map(async (g) => {
            let genresToAdd = await Genre.findOne({
            where: {name: g.name}
            })
            console.log(g.name);
            await videogame.addGenre(genresToAdd) 
        })        
    }


    created ? res.send('Videojuego creado con exito.') : res.send('El videojuego ya existe.');
})

router.get('/platforms', (req, res) => {    
    axios.get('https://api.rawg.io/api/platforms?key=' + API_KEY)
    .then(response => {
        let platforms = response.data.results.map(p => {
            return p.name
        });
        res.send(platforms);
    })

})

module.exports = router;
