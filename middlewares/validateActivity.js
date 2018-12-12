const emptyErrMsg = 'cannot be undefined, null or of length 0.'

const isEmpty = (field) => {
    if (!field || field === null || field.trim().length === 0)
        return true;
    return false;
}
module.exports = (req, res, next) => {
    let userId = req.body.userId;
    if (isEmpty(userId)) {
        return res.status(422).json({
            status: 422,
            error: `userId ${emptyErrMsg}`
        })
    }
    userId = userId.trim();

    let description = req.body.description;
    if (isEmpty(description)) {
        return res.status(422).json({
            status: 422,
            error: `description ${emptyErrMsg}`
        })
    }
    description = description.trim();

    let duration = req.body.duration;
    if (isEmpty(duration)) {
        return res.status(422).json({
            status: 422,
            error: `duration ${emptyErrMsg}`
        })
    }

    duration = parseInt(duration.trim());
    if (isNaN(duration)) {
        return res.status(422).json({
            status: 422,
            error: `Cannot parse data 'duration' to type Integer.`
        })
    }

    if (!isEmpty(req.body.date)) {
        let date = req.body.date.trim();
        date = Date.parse(date);
        if (isNaN(date)) {
            return res.status(422).json({
                status: 422,
                error: `Cannot parse data 'date' to type Date. Date should be in format yyyy-mm-dd`
            })
        }
        req.body.date = date;
    } else {
        req.body.date = Date.now();
    }

    req.body.userId = userId;
    req.body.description = description;
    req.body.duration = duration;

    next();
}