import { validateInput } from '../helper/validator';
import markupHelper from '../helper/markup-helper';

const markupApi = {
    /**
     * API for creating formatted text
     * @param  {Object} req
     * @param  {Object} res
     */
    createMarkup: async function createMarkup(req, res) {
        try {
            const { feed, extractor } = req.body;
            await validateInput(feed, extractor);
            let response = await markupHelper.createMarkup(feed, extractor);
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


export default markupApi;