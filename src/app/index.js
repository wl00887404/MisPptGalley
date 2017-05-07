require('../sass/reset.scss')

import React from 'react'
import styles from './styles.scss'
import {BrowserRouter as Router, Route,} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store.js'

import Modify from '../pages/modify'
import Login from '../pages/login'
import List from '../pages/main'
import Slide from '../pages/slide'
import StatusBar from '../components/statusBar'
import {showStatus} from '../action.js'
let io = require('socket.io-client')()

io.on('addCommit', (msg) => {
    store.dispatch(Object.assign(JSON.parse(msg), {type: "addCommit"}))
}).on('forceUpdate',(msg)=>{
    window.location=window.location.href
}).on('modifyGroups',(msg)=>{
    store.dispatch({type:"getGroupsData",data:JSON.parse(msg)})
}).on("broadcast",(msg)=>{
    store.dispatch(showStatus(msg,"",5000))
})

window.broadcast=(msg)=>{
	fetch(`/broadcast/${msg}`)
}
window.forceUpdate=(msg)=>{
	fetch(`/forceUpdate`)
}
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let guest = localStorage.getItem("guest")
        if (guest) {
            store.dispatch({type: "setGuest", name: guest})
        }
        fetch('/groups').then(res => res.json()).then(json => {
            store.dispatch({type: "getGroupsData", data: json,})
        })
    }
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <div>
                        <Route exact path="/" component={Login}/>
                        <Route path="/list" component={List}/>
                        <Route path="/slide/:index" component={Slide}/>
                        <Route path="/modify/:index" component={Modify}/>
                        <StatusBar/>
                    </div>
                </Provider>
            </Router>
        )
    }
}
