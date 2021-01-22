const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cors = require('cors')


const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/lab', require('./routes/lab.routes'))

// app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
//
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
// })

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`)
            console.log(`Base url is ${config.get('baseUrl')}`)
        })

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

