import React from 'react'

const Things = ({things}) =>{
    return(
        <ul>
            {
                things.map( thing => {
                    return(
                        <li key={thing.id}>
                            {thing.name}
                            <ul>
                                {thing.favorites.map((favorite)=>{
                                    return (
                                        <li key={favorite.id}>
                                            {`favorited by: ${favorite.user.name}`}
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

export default Things