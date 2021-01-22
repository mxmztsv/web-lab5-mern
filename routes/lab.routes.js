const {Router} = require('express')
const config = require('config')
const User = require('../models/User')
const Point = require('../models/Point')
const mongoose = require('mongoose')
const auth = require('../middleware/auth.middleware')

const router = Router()


const ObjectId = mongoose.Types.ObjectId

router.get('/points', auth, async (req, res) => {
    try {

        const points = await Point.find({owner: req.user.userId})
        res.json(points)

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/check', auth, async (req, res) => {
    try {

        const {x, y, r} = req.body

        const owner = req.user.userId
        let result

        if (r !== 0) {
            const rHalf = Math.abs(r) / 2;

            const firstHalf = (x >= 0 && y >= 0);
            const inCircle = x * x + y * y <= rHalf * rHalf;

            const thirdHalf = (x <= 0 && y <= 0);
            const inSquare = (x >= - Math.abs(r) && y >= - Math.abs(r));

            const forthHalf = (x >= 0 && y <= 0);
            const inTriangle = (x <= rHalf && y >= - rHalf && (x - y <= rHalf));

            result = ((firstHalf && inCircle)
                || (thirdHalf && inSquare)
                || (forthHalf && inTriangle))

        } else if (r === 0){
            result = false
        }

        const point = new Point({x, y, r, owner, result})
        await point.save()

        res.status(201).json({point})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/clear', auth, async (req, res) => {
    try {

        await Point.deleteMany({owner: req.user.userId})
        res.status(201).json({message: 'successfully cleared'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

router.post('/delete', auth, async (req, res) => {
    try {

        const {id} = req.body

        await Point.deleteOne(
            {
                owner: req.user.userId,
                _id: id,
            })
        res.status(201).json({message: 'successfully deleted'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так'})
    }
})

module.exports = router

