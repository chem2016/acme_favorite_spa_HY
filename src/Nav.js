import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

const Nav = (props) =>{
    const {location} = props
    const pathname = location.pathname
    const links = [
        '/users',
        '/things',
    ];
    return (
        <ul className='nav nav-tabs'>
            {
                links.map( link => {
                    return (
                        <li key={link} className='nav-item'>
                            <Link to={link} className={`nav-link${ link === pathname ? ' active ' : ''}`}>
                            { link.slice(1) }
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Nav