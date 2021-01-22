import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = (props) => {
    const auth = useContext(AuthContext)
    const dispatch = props.dispatch
    const { changeName } = props
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        login: '',
        pass: ''
    })


    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        if (form.pass.trim().length > 0 && form.login.trim().length > 0) {
            try {

                // здесь будет запрос на авторизацию

                const data = await request('/api/auth/login', 'POST', {...form})
                // let formdata = new FormData()
                // formdata.append("username", form.login)
                // formdata.append("password", form.pass)


                // const data = await request('http://localhost:8080/api/v1/session/create', 'POST', {...form})
                // const data = await request(`http://localhost:8080/api/v1/session/create?username=${form.username}&password=${form.password}`, 'POST')
                // const data = JSON.parse(resp)
                console.log("Data", data)
                // localStorage.setItem('userData', data)

                // ожидается что то типа такого в ответе
                // const data = {
                //     token: 'testToken',
                //     userId: '123',
                //     name: 'Maxim'
                // }

                auth.login(data.token, data.userId, data.userId)
                changeName(data.userId)

            } catch (e) {
                console.log(e.message)
            }
        }

    }


    const registerHandler = async () => {
        if (form.pass.trim().length > 0 && form.login.trim().length > 0) {
            try {

                // здесь будет запрос на регистрацию

                // let formdata = new FormData()
                // formdata.append("username", form.login)
                // formdata.append("password", form.pass)


                // const data = await request(`http://localhost:8080/api/v1/user/create?username=${form.username}&password=${form.password}`, 'POST')
                // const data = JSON.parse(resp)

                // const data = await fetch()

                // let data = await fetch('http://localhost:8080/api/v1/user/create', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json;charset=utf-8'
                //     },
                //     body: JSON.stringify({...form})
                // });

                // auth.login(data.token, data.userId, data.userId)
                // changeName(data.userId)

                console.log({...form})
                const data = await request('/api/auth/register', 'POST', {...form})
                message('Регистрация успешна')
                console.log('Data', data)
            } catch (e) {
                console.log(e.message)
            }
        }

    }

    return (
        <div className="row">
            <div className="col s10 offset-s1">
                <h1>Вход</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Войдите или зарегистрируйтесь</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Введите логин" id="login" type="text" name="login" value={form.login} onChange={changeHandler}/>
                                <label htmlFor="login">Логин</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Введите пароль" id="pass" type="password" name="pass" value={form.pass} onChange={changeHandler}/>
                                <label htmlFor="pass">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading} style={{marginRight: 10}}>Войти</button>
                        <button className="btn yellow darken-4" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
