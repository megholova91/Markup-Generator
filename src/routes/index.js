import express from 'express';
const router = express.Router();
import ruleApi from '../controllers/rule-api';
import markupApi from '../controllers/markup-api';

router.use('/healthcheck', function (req, res, next) {
    res.json({
        "uptime": process.uptime()
    });
});

router.post('/create-rule', ruleApi.createRule);
router.post('/create-markup', markupApi.createMarkup);

module.exports = router;
