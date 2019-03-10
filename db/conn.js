const Sequelize = require('sequelize')

const usernames = ['moe', 'larry', 'curly', 'shep'];
const things = ['foo', 'bar', 'bazz', 'quq', 'quip'];

console.log(process.env.DATABASE_URL)
const conn = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
})

const User = conn.define('user',{
    name: {
        type: Sequelize.STRING,
    }
})

const Thing = conn.define('thing',{
    name: {
        type: Sequelize.STRING,
    }
})

const Favorite = conn.define('favorite',{
    rank: {
        type: Sequelize.INTEGER,
    }
})

User.hasMany(Favorite)
Favorite.belongsTo(User)
Thing.hasMany(Favorite)
Favorite.belongsTo(Thing)

const syncAndSeed = () =>{
    return conn.sync({force: true})
        .then(()=>{
            return Promise.all([
                Promise.all(usernames.map(name=>User.create({name})))
                    .then(items => items.reduce((acc, item)=>{
                        acc[item.name] = item;
                        return acc;
                    },{}))
                    ,
                Promise.all(things.map(name=>Thing.create({name})))
                    .then(items=>items.reduce((acc, item)=>{
                        acc[item.name] = item;
                        return acc;
                    },{})),
            ]);

        })
        .then(([userMap, thingMap])=>{
            return Promise.all([
                Favorite.create({ userId: userMap.moe.id, thingId: thingMap.foo.id, rank: 7 }),
                Favorite.create({ userId: userMap.moe.id, thingId: thingMap.bar.id, rank: 5 }),
                Favorite.create({ userId: userMap.moe.id, thingId: thingMap.bazz.id, rank: 1 }),
                Favorite.create({ userId: userMap.larry.id, thingId: thingMap.bazz.id, rank: 2 }),
                Favorite.create({ userId: userMap.larry.id, thingId: thingMap.bar.id, rank: 1 }),
            ])
        })
        //.then(()=>console.log('synced!'))
}

module.exports = {
    syncAndSeed,
    Thing,
    Favorite,
    User,
}