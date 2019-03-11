import React, {Component} from 'react'
import { Switch, Redirect, HashRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import Users from './Users'
import Things from './Things'
import Nav from './Nav'

class App extends Component{
    constructor(){
        super();
        this.state = {
            users: [],
            things: [],
        }
    }

    componentDidMount(){
        Promise.all([
            axios.get('/api/users'),
            axios.get('/api/things'),
        ])
        .then((responses)=>{
            this.setState({users: responses[0].data})
            this.setState({things: responses[1].data})
        })
    }


    render(){
        const { users, things } = this.state;
        console.log(`users: ${users}`)
        console.log(`things: ${things}`)
        return(
            <Router>
            <div>           
                <h1>Acme Favorites</h1>
                <Route component={Nav} />
                <Switch>
                    <Route path='/users' render={ ()=> <Users users={users}/> }/>
                    <Route path='/things' render={ ()=> <Things things={things}/> }/> 
                    <Redirect to='/users'/>
                </Switch> 
            </div>
            </Router>
        )
    }
}


export default App