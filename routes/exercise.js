const {
    Router
} = require('express');
const randomstring = require('randomstring');
const {
    User
} = require('../db/index');
const validateActivity = require('../middlewares/validateActivity');
const route = Router();

route.post('/new-user', async (req, res) => {
    const userId = randomstring.generate(9);
    const username = req.body.username;
    if (username && username.trim().length == 0) {
        return res.status(422).json({
            status: 422,
            error: 'username cannot be empty'
        });
    };

    const result = await User.findOrCreate({
        where: {
            username: username
        },
        defaults: {
            userId: userId
        }
    });

    if (!result[1]) {
        return res.status(422).json({
            status: 422,
            error: 'username has already been taken'
        });
    }

    return res.status(201).json({
        status: 201,
        response: {
            username: username,
            userId: userId
        }
    })

});

route.post('/add', validateActivity , async (req, res) => {
    const userId = req.body.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;

    const user = await User.findOne({
        where: {
            userId: userId
        }
    });

    if(user == null) {
        return res.status(422).json({
            status: 422,
            error: 'unknown user id'
        });
    }

    const exercise = await user.createExercise({
        description: description,
        duration: duration,
        date: date
    });

    return res.status(201).json({
        status: 201,
        response: {
            userId: user.userId,
            username: user.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }
    })

});


module.exports = route;