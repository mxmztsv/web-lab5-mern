import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {Graph} from "../components/Graph";
import {useMessage} from "../hooks/message.hook";
import {ResultsList} from "../components/ResultsList";
import useMousePosition from "../hooks/mouse.hook";
import ReactCursorPosition from "react-cursor-position";
import {WrappedGraph} from "../App";

export const MainPage = (props) => {
// export class MainPage extends React.Component{
//
//     const pointsList = [
//         {
//             x: 1,
//             y: 1,
//             r: 2,
//             result: false
//         },
//         {
//             x: 0,
//             y: 0,
//             r: 1,
//             result: true
//         },
//         {
//             x: -2,
//             y: 1.2,
//             r: 3,
//             result: false
//         },
//         {
//             x: -1.12,
//             y: -1.6,
//             r: 2,
//             result: true
//         },
//         {
//             x: 0.35,
//             y: -0.9,
//             r: 2,
//             result: false
//         },
//         {
//             x: -2,
//             y: 1,
//             r: 3,
//             result: false
//         }
//     ]


    const [x, setX] = useState(0)
    const [y, setY] = useState('')
    const [r, setR] = useState(2)
    const [points, setPoints] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const {userId} = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { mouseX, mouseY } = useMousePosition()
    // const { changePoints } = props.changePoints

    // setPoints(pointsList)

//     const getHistory = async () => {
//         const data = await request(`http://localhost:8080/api/v1/history/get/`, 'GET', {
//             'x-user-id': userId,
//             'x-token': token
//         })
//
//         // const data = JSON.parse(resp)
//         setPoints(data)
// }

    const getHistory = useCallback(async () => {
        try {
            const data = await request('/api/lab/points', 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })

            // const data = JSON.parse(resp)
            setPoints(data)
        } catch (e) {}
    }, [token, request, userId])


    // useEffect(() => {
    //     window.M.updateTextFields()
    //     // getHistory()
    //     // window.M.updateTextFields()
    // }, [])

    useEffect(() => {
        window.M.updateTextFields()
        getHistory()
        // window.M.updateTextFields()
    }, [getHistory])



    const submitHandler = async () => {
        const numY = Number(y)
        if (numY !== undefined && numY > -3 && numY < 3 && y !== '') {
            message('x = ' + x + ', y = ' + y + ', r = ' + r)

            // здесь будет ajax запрос на добавление точки

            // await request(`http://localhost:8080/api/v1/area/check/?x=${x}&y=${y}&r=${r}`, 'POST', {
            //     'x-user-id': userId,
            //     'x-token': token
            // })

            await request('/api/lab/check', 'POST', {x, y, r},
                {
                    Authorization: `Bearer ${auth.token}`
                })

            const data = await request('/api/lab/points', 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })

            // const data = await request(`http://localhost:8080/api/v1/history/get/`, 'GET', {
            //     'x-user-id': userId,
            //     'x-token': token
            // })

            // const data = JSON.parse(resp)
            setPoints(data)

        } else {
            message('Некорректный Y')
            setY('')
        }

    }


    const clearHandler = async () => {

        message('Очистка...')
        // message(userId)

        // здесь будет ajax запрос на удаление всех точек
        // await request(`http://localhost:8080/api/v1/history/clear/`, 'POST', {
        //     'x-user-id': userId,
        //     'x-token': token
        // })

        const data = await request('/api/lab/clear', 'POST', null,
            {
                Authorization: `Bearer ${auth.token}`
            })

        getHistory()


    }

    const changeR = (r) => {
        setR(r)

    }



    if (loading) {
        return <Loader/>
    }

    // const hasMovedCursor = typeof mouseX === "number" && typeof mouseY === "number";

    return (
        <>
            <div className="row">
                <div className="col s12 m6 xl6">
                    <div className="card-panel pink lighten-1 hoverable">
                        {/*<div className="graph-box">*/}
                        <ReactCursorPosition>
                            <Graph points={points} r={r} function={setPoints}/>
                            {/*<WrappedGraph points={points} r={r}/>*/}
                            {/*<WrappedGraph points={points} r={r} changePoints={props.changePoints}/>*/}
                        </ReactCursorPosition>

                        {/*</div>*/}

                    </div>
                </div>
                <div className="col s12 m6 xl6">
                    {/*<div className="card-panel teal">*/}

                    {/*</div>*/}
                    <div className="card blue hoverable">
                        <div className="card-content white-text">
                            <span className="card-title">Параметры точки</span>
                            <div>

                                <label htmlFor="choose-x" className="white-text">Выберите X</label>
                                <div className="input-field form-field" id="choose-x">

                                    <div className="row">

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === -2} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(-2)
                                                    }}/>
                                                    <span className="white-text">-2</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === -1.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(-1.5)
                                                    }}/>
                                                    <span className="white-text">-1.5</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === -1} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(-1)
                                                    }}/>
                                                    <span className="white-text">-1</span>
                                                </label>
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === -0.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(-0.5)
                                                    }}/>
                                                    <span className="white-text">-0.5</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === 0} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(0)
                                                    }}/>
                                                    <span className="white-text">0</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === 0.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(0.5)
                                                    }}/>
                                                    <span className="white-text">0.5</span>
                                                </label>
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === 1} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(1)
                                                    }}/>
                                                    <span className="white-text">1</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === 1.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(1.5)
                                                    }}/>
                                                    <span className="white-text">1.5</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={x === 2} onChange={e => {
                                                        // showHiddenOnly()
                                                        setX(2)
                                                    }}/>
                                                    <span className="white-text">2</span>
                                                </label>
                                            </p>
                                        </div>

                                    </div>


                                </div>


                                <div className="input-field">
                                    <input placeholder="(-3;3)" id="yField" type="text" name="yField" maxlength="17" value={y}
                                           onChange={e => {
                                               setY(e.target.value.trim())
                                           }}/>
                                    <label htmlFor="yField" className="white-text">Введите Y</label>
                                </div>

                                <label htmlFor="choose-r" className="white-text">Выберите R</label>
                                <div className="input-field form-field" id="choose-r">

                                    <div className="row">

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === -2} onChange={e => {
                                                        // showHiddenOnly()
                                                        changeR(-2)
                                                    }}/>
                                                    <span className="white-text">-2</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === -1.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        changeR(-1.5)
                                                    }}/>
                                                    <span className="white-text">-1.5</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === -1} onChange={e => {
                                                        // showHiddenOnly()
                                                        changeR(-1)
                                                    }}/>
                                                    <span className="white-text">-1</span>
                                                </label>
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === -0.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        setR(-0.5)
                                                    }}/>
                                                    <span className="white-text">-0.5</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === 0} onChange={e => {
                                                        // showHiddenOnly()
                                                        setR(0)
                                                    }}/>
                                                    <span className="white-text">0</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === 0.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        setR(0.5)
                                                    }}/>
                                                    <span className="white-text">0.5</span>
                                                </label>
                                            </p>
                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === 1} onChange={e => {
                                                        // showHiddenOnly()
                                                        setR(1)
                                                    }}/>
                                                    <span className="white-text">1</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === 1.5} onChange={e => {
                                                        // showHiddenOnly()
                                                        setR(1.5)
                                                    }}/>
                                                    <span className="white-text">1.5</span>
                                                </label>
                                            </p>
                                        </div>

                                        <div className="col s4">
                                            <p>
                                                <label>
                                                    <input type="checkbox" className="filled-in checkbox-orange" checked={r === 2} onChange={e => {
                                                        // showHiddenOnly()
                                                        setR(2)
                                                    }}/>
                                                    <span className="white-text">2</span>
                                                </label>
                                            </p>
                                        </div>

                                    </div>


                                </div>

                                {/*<div className="input-field">*/}
                                {/*    <input placeholder="Введите пароль" id="pass" type="password" name="pass" value={form.pass} onChange={changeHandler}/>*/}
                                {/*    <label htmlFor="login">Пароль</label>*/}
                                {/*</div>*/}

                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4 pulse" onClick={submitHandler} disabled={loading} style={{marginRight: 10}}>Проверить</button>
                            <button className="btn yellow darken-4" onClick={clearHandler} disabled={loading}>Очистить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <div className="card-panel teal hoverable">
                        <ResultsList points={points}/>
                    </div>
                </div>
            </div>
        </>
    )
}
