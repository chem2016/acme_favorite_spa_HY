const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Thing, Favorite, User } = require('./db/conn');

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist','main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next) => {
    User.findAll(
        {
            include: [
                {
                    model: Favorite,
                    include: [ Thing ]
                }
            ],
            order: [ 'name' ]
        }	
    )
    .then( (users) => res.send(users))
    .catch(next);
});

app.get('/api/things', (req, res, next) => {
Thing.findAll(
    {
        include: [
            {
                model: Favorite,
                include: [ User ]
            }
        ],
        order: [ 'name' ]
    }
)
.then( things => res.send(things))
.catch(next);
});

// app.get('/api/users',(req, res, next)=>{
//     User.findAll({include: [
//         {model: Favorite}
//     ]})
//         .then((users)=>{
//             res.send(users)
//         })
//         .catch(next)
// })

// app.get('/api/things',(req, res, next)=>{
//     Thing.findAll({include: [
//         {model: Favorite}
//     ]})
//         .then((things)=>{
//             res.send(things)
//         })
//         .catch(next)
// })

syncAndSeed()
    .then(()=>{app.listen(port, ()=>console.log(`listening on ${port}`))})
