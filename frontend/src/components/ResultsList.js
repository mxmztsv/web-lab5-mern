import React from 'react'
import {Link} from 'react-router-dom'

export const ResultsList = ({ points }) => {
    if (!points.length) {
        return <p className="center">Точек пока нет</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Попадание</th>
            </tr>
            </thead>

            <tbody>
            { points.map((point, index) => {
                return (
                    <tr key={point._id}>
                        <td>{index + 1}</td>
                        <td>{point.x}</td>
                        <td>{point.y}</td>
                        <td>{point.r}</td>
                        <td>{point.result ? '+' : '-'}</td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}
