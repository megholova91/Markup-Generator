import { validateRule } from '../helper/validator';
import ruleHelper from '../helper/rule-helper';

const ruleApi = {
    /**
     * API for creating new concepts with associated tags and attributes
     * @param  {Object} req
     * @param  {Object} res
     */
    createRule: async function createRule(req, res) {
        try {
            const { concept, tag, attributes } = req.body;
            await validateRule(concept, tag, attributes);
            let response = await ruleHelper.createRule(concept, tag, attributes);
            res.status(200).send({
                'status': 'SUCCESS',
                'message': response
            });
        } catch (e) {
            res.status(400).send({
                'status': "ERROR",
                'message': e
            });
        }
    }
}

export default ruleApi;