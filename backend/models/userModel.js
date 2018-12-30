var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cpfcnpj: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit)
}