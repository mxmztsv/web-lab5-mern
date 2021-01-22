const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.post(
    '/register',
    async (req, res) => {
        try {

            const {login, pass} = req.body

            console.log('login', login)
            console.log('pass', pass)

            const candidate = await User.findOne({ login })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(pass, 15)
            const user = new User({ login, pass: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })


router.post(
    '/login',
    async (req, res) => {
    try {

        const {login, pass } = req.body

        const user = await User.findOne({ login })

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        const isMatch = await bcrypt.compare(pass, user.pass)

        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1000h' }
        )

        res.json({ token, userId: user.id, name: user.name })


    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router
