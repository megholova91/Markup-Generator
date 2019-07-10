import ruleHelper from "./rule-helper";

const markupHelper = {
    /**
     * Method for creating the formatted string for any given feed and concepts in it
     * @param  {String} feed
     * @param  {Array} extractor
     */
    createMarkup: async function createMarkup(feed, extractor) {
        try {
            let ruleDetails = await ruleHelper.getFileContent();
            let rules = JSON.parse(ruleDetails).rules;
            let indexMap = this.createIndexMap(extractor, rules, feed);
            let res = this.createNewString(indexMap, feed);
            return res;
        } catch (e) {
            return (e);
        }
    },
    /**
     * Method which computes a mapping of index to required tags
     * @param  {Array} extractor
     * @param  {Object} rules
     * @param  {String} feed
     */
    createIndexMap: function createIndexMap(extractor, rules, feed) {
        let indexMap = {};
        extractor.forEach(element => {
            let { start, end, concept } = element;
            if (rules[concept]) {
                let { tag, attributes } = rules[concept];
                let startTag = `<${tag}`;
                let endTag = `</${tag}>`;
                attributes.forEach(attr => {
                    startTag += ` ${attr.name}='${attr.fixedValue}`;
                    if (attr.textValue) {
                        startTag += `${feed.substring(start, end + 1)}'`;
                    } else {
                        startTag += `'`;
                    }
                });
                startTag += '>';
                if (!indexMap[start]) {
                    indexMap[start] = [];
                }
                indexMap[start].push(startTag);
                if (!indexMap[end + 1]) {
                    indexMap[end + 1] = [];
                }
                indexMap[end + 1].unshift(endTag);
            }
        });
        return indexMap;
    },
    /**
     * Method which computes the formatted string
     * @param  {Object} indexMap
     * @param  {String} feed
     */
    createNewString: function createNewString(indexMap, feed) {
        let res = '', idx;
        for (idx = 0; idx < feed.length; idx++) {
            if (indexMap[idx]) {
                indexMap[idx].forEach(item => {
                    res += item;
                });
            }
            res += feed[idx];
        }
        // Check for closing tag at the end of feed
        if (indexMap[idx + 1]) {
            indexMap[idx + 1].forEach(item => {
                res += item;
            });
        }
        return res;
    }
}

export default markupHelper;