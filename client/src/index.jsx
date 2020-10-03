import React from "react";
import ReactDOM from 'react-dom';
import Home from './components/Home.jsx'
import Todo from './components/Todo.jsx'
import Chat from './components/Chat.jsx'
import Land from './components/Landingpage.jsx'

import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'

// It's better to seperate your imports (the modules together, and then your components)

class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
        <Router>
        <div>
            <Land /> 
            <Switch>
                <Route path='/home' exact component={Home}/>
                <Route path='/chat' component={Chat}/>
                <Route path='/todo' component={Todo}/>
            </Switch>
        </div>
    </Router>
    </div>
        )
    }
}

ReactDOM.render(<App/> , document.getElementById('app'))
