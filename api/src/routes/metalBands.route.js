const express = require('express');
const { body, checkSchema, validationResult } = require('express-validator');
const router = express.Router({ mergeParams: true });
const { getData } = require('../lib/metalBands');

const requestSchema = {
    page: {
        optional: true,
        in: ['query'],
        isInt: true,
        toInt: true,
        errorMessage: 'Page is wrong'
    },
    pagination: {
        optional: true,
        in: ['query'],
        isInt: true,
        toInt: true,
        errorMessage: 'Pagination is wrong'
    }
}

router.get('/',
    checkSchema(requestSchema)
    , (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        getData(req.query.page, req.query.pagination)
            .then((rows) => res.json(rows));
    }
);


module.exports = router;