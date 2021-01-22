import React from 'react'
import 'materialize-css'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import {Navbar} from "./components/Navbar"
import {bindActionCreators, createStore} from 'redux'
import {connect, Provider} from 'react-redux'
import {MainPage} from "./pages/MainPage";
import {AuthPage} from "./pages/AuthPage";
import {Graph} from "./components/Graph";

const initialState = {
    name: '42',
    points: []
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ACTION_CHANGE_NAME':
            return {...state, name: action.payload}
        case 'ACTION_CHANGE_POINTS':
            return {...state, points: action.payload}
    }

    return state
}

const store = createStore(rootReducer)

console.log(store.getState())

const putStateToProps = (state) => {
    console.log(state)
    return {
        name: state.name,
        points: state.points
    }
}

const putActionToProps = (dispatch) => {
    return {
        changeName: bindActionCreators(changeName, dispatch),
        changePoints: bindActionCreators(changePoints, dispatch)
    }
}

const WrappedNavbar = connect(putStateToProps)(Navbar)
const WrappedAuthPage = connect(putStateToProps, putActionToProps)(AuthPage)
const WrappedMainPage = connect(putStateToProps, putActionToProps)(MainPage)
export const WrappedGraph = connect(putStateToProps, putActionToProps)(Graph)

const changeName = (newName) => {
    return {
        type: 'ACTION_CHANGE_NAME',
        payload: newName
    }
}
const changePoints = (newPoints) => {
    return {
        type: 'ACTION_CHANGE_POINTS',
        payload: newPoints
    }
}


function App() {
    const {token, login, logout, userId, ready} = useAuth()
    console.log(token, login, logout, userId, ready)
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Provider store={store}>
            <Router>
                {/*{isAuthenticated && <WrappedNavbar/>}*/}

                {/*<div className="container">*/}
                {/*    {routes}*/}
                {/*</div>*/}

                {isAuthenticated ? (
                    <>
                        <WrappedNavbar/>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact>
                                    <WrappedMainPage />
                                </Route>
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact>
                                    <WrappedAuthPage />
                                </Route>
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </>
                )}
            </Router>
            </Provider>
        </AuthContext.Provider>
    )
}

// function App() {
//     return (
//         <Provider store={store}>
//             <main/>
//         </Provider>
//     )
// }

export default App

