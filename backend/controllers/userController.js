User = require('../models/userModel')
helper = require('../utils/helpers')

// Handle index actions
module.exports.index = function(req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        })
    })
}

// Handle create user
module.exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    if (helper.validate_cpf_cnpj(req.body.cpfcnpj)) {
        user.cpfcnpj = req.body.cpfcnpj;
    } else {
        res.json({
            message: 'CPF or CNPJ is invalid!',
            data: user
        })
    }

    user.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: 'User information already used or invalid.',
            });
        }
        res.json({
            message: 'New user created!',
            data: user
        })
    })
}

// Handle view user info
module.exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// Handle update user info
module.exports.update = function (req, res) {

    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);

        user.name = req.body.name ? req.body.name : user.name;
        user.cpfcnpj = req.body.cpfcnpj;
        user.active = req.body.active;

        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};

// Handle delete user
module.exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};