import React, {useContext} from 'react'
import useMousePosition from "../hooks/mouse.hook";
import ReactCursorPosition from 'react-cursor-position';
import {useMessage} from "../hooks/message.hook";
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'



// this._onMouseMove(e) {
//         // this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
// }

export const Graph = (props) => {
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const {userId} = useContext(AuthContext)
    const auth = useContext(AuthContext)
    const message = useMessage()
    // const {changePoints} = props.changePoints

    const {
        detectedEnvironment: {
            isMouseDetected = false,
            isTouchDetected = false
        } = {},
        elementDimensions: {
            width = 0,
            height = 0
        } = {},
        position: {
            x = 0,
            y = 0
        } = {},
        isActive = false,
        isPositionOutside = false
    } = props;

    // const drawPoints = () => {
    //     { props.points.map((point, index) => {
    //
    //     }) }
    // }


    const svgSize = 300

    // перевод в координаты относительно начала координат на графике (с божьей помощью)
    const graphX = (((Number(props.r) / 50) * (svgSize / 2 - x) * -1) / 2).toFixed(1)
    const graphY = (((Number(props.r) / 50) * (svgSize / 2 - y)) / 2 ).toFixed(1)

    // const {mouseX, mouseY} = useMousePosition()
    // const hasMovedCursor = typeof mouseX === "number" && typeof mouseY === "number";

    // const [mouseX, setMouseX] = useState(0)
    // const [mouseY, setMouseY] = useState(0)
    // if (!categories.length) {
    //     return <p className="center">Фильмов пока нет</p>
    // }

    const graphClickHandler = async () => {

        try {
            // await request(`http://localhost:8080/api/v1/area/check/?x=${graphX}&y=${graphY}&r=${Number(props.r)}`, 'POST', {
            //     'x-user-id': userId,
            //     'x-token': token
            // })

            await request('/api/lab/check', 'POST', {x: graphX, y: graphY, r: Number(props.r)},
                {
                    Authorization: `Bearer ${auth.token}`
                })
            var data = await request('/api/lab/points', 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })

            // var data = await request(`http://localhost:8080/api/v1/history/get/`, 'GET', {
            //     'x-user-id': userId,
            //     'x-token': token
            // })

            props.function(data)
        } catch (e) {

        }


        // changePoints(data)


        console.log('Ответ с клика по графику',data)
        // window.location.reload()


        message('x = ' + graphX + ' y = ' + graphY)



    }


    return (
        // <ReactCursorPosition>
            <div onClick={graphClickHandler} className={"graph-wrap"}>
                <svg width="300" height="300" className="svg-graph" xmlns="http://www.w3.org/2000/svg">

                    {/*Линии оси*/}

                    <line className="axis" x1="50" x2="250" y1="150" y2="150" stroke="white"/>
                    <line className="axis" x1="150" x2="150" y1="0" y2="300" stroke="white"/>
                    <polygon points="150,0 144,15 156,15" stroke="white" fill="white"/>
                    <polygon points="265,150 250,156 250,144" stroke="white" fill="white"/>

                    <line className="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="white"/>
                    <line className="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="white"/>

                    <line className="coor-line" x1="50" x2="50" y1="155" y2="145" stroke="white"/>
                    <line className="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="white"/>

                    <line className="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="white"/>
                    <line className="coor-line" x1="145" x2="155" y1="50" y2="50" stroke="white"/>

                    <line className="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="white"/>
                    <line className="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="white"/>

                    <text className="coor-text" x="195" y="140" fill="white">{props.r/2}</text>
                    <text className="coor-text" x="248" y="140" fill="white">{props.r}</text>

                    <text className="coor-text" x="40" y="140" fill="white">{props.r * -1}</text>
                    <text className="coor-text" x="90" y="140" fill="white">{props.r/2 * -1}</text>

                    <text className="coor-text" x="160" y="105" fill="white">{props.r/2}</text>
                    <text className="coor-text" x="160" y="55" fill="white">{props.r}</text>

                    <text className="coor-text" x="160" y="205" fill="white">{props.r/2 * -1}</text>
                    <text className="coor-text" x="160" y="255" fill="white">{props.r * -1}</text>

                    {Number(props.r) === 0 ? (<></>) : (
                        Number(props.r) > 0 ? (
                            // Фигуры при положительном R
                        <>
                        <polygon className="svg-figure rectangle-figure" points="150,150 150,250 50,250, 50,150"
                                 fill="white" fill-opacity="0.3" stroke="white"/>


                        <path className="svg-figure circle-figure"
                              d="M 200 150 A 50 50, 90, 0, 0, 150 100 L 150 150 Z"
                              fill="white" fill-opacity="0.3" stroke="white"/>



                        <polygon className="svg-figure triangle-figure" points="150,200 150,150 200,150"
                                 fill="white" fill-opacity="0.3" stroke="white"/>
                                 </>) : (
                                     // Фигуры при отрицательном R
                                     <>
                                         <polygon className="svg-figure rectangle-figure" points="150,150 150,50 250,50, 250,150"
                                                  fill="white" fill-opacity="0.3" stroke="white"/>


                                         <path className="svg-figure circle-figure"
                                               d="M 100 150 A 50 50, 90, 0, 0, 150 200 L 150 150 Z"
                                               fill="white" fill-opacity="0.3" stroke="white"/>



                                         <polygon className="svg-figure triangle-figure" points="150,100 150,150 100,150"
                                                  fill="white" fill-opacity="0.3" stroke="white"/>
                                              </>
                                     )
                        )}





                    {/*<circle r="3" cx="150" cy="150" id="target-dot"/>*/}

                    { props.points.map((point, index) => {
                        const cx = (Number(point.x) * 2) / Number(props.r) * 50 + 300 / 2
                        const cy = 300 / 2 - (Number(point.y) * 2) / Number(props.r) * 50
                        const color = point.result ? "white" : "white"
                            return (
                                <circle r="5" cx={Number(cx)} cy={Number(cy)} id="target-dot" stroke={color} fill={point.result ? "white" : "transparent"}/>

                    )
                    }) }



                </svg>
                <p>
                    {`x: ${graphX}`}<br />
                    {`y: ${graphY}`}<br />
                </p>
            </div>
        // </ReactCursorPosition>
    )
}

Graph.defaultProps = {
    shouldShowIsActive: true
};
