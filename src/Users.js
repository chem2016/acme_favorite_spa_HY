import React from 'react'

const Users = ({users}) =>{
    return(
        <ul>
            {
                users.map( user => {
                    return(
                        <li key={user.id}>
                            {user.name}
                            <ul>
                                {user.favorites.map((favorite)=>{
                                    return(
                                        <li key={favorite.id}>
                                            {`${favorite.thing.name} (Ranked: ${favorite.rank})`}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })
            }
        </ul>
    )
}


export default Users