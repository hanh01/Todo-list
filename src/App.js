import React,{Component} from 'react';
import './App.css';
import Home from "./Components/Home";
import Edit from "./Components/Edit";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Create from "./Components/Create";
import * as axios from "axios";
import Completed from "./Components/Completed";

class App extends Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path={`/todos/:id/edit`} component={Edit}/>
                    <Route path="/todos/create" component={Create}/>
                    <Route path={`/todos/completed/`} component={Completed}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
