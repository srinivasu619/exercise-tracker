const {
    db
} = require('./setup');
const User = require('./models/user');
const ExerciseActivity = require('./models/exercise');

User.hasMany(ExerciseActivity);
ExerciseActivity.belongsTo(User);

module.exports = {
    db,
    User,
    ExerciseActivity
}