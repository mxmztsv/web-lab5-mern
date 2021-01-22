const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    r: {type: Number, required: true},
    result: {type: Boolean, required: true},
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
})

module.exports = model('Point', schema)
