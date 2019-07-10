const validator = {
    /**
     * Method for validation of rule object created for a concept by user
     * @param  {String} concept
     * @param  {String} tag
     * @param  {Array} attributes
     */
    validateRule: function validateRule(concept, tag, attributes) {
        return new Promise((resolve, reject) => {
            let validationResult = validator.checkRuleFormat(concept, tag, attributes);
            if (validationResult.length > 0) {
                return reject(validationResult);
            } else {
                return resolve();
            }
        });
    },
    /**
     * Method to check format of each rule object
     * @param  {String} concept
     * @param  {String} tag
     * @param  {Array} attributes
     */
    checkRuleFormat: function checkRuleFormat(concept, tag, attributes) {
        let validationResult = [];
        if (!this.validString(concept)) {
            validationResult.push('Invalid concept');
        }
        if (!this.validString(tag)) {
            validationResult.push('Invalid tag');
        }
        if (this.nullOrUndefined(attributes) ||
            !Array.isArray(attributes) ||
            !this.validAttributes(attributes)) {
                validationResult.push('Invalid attributes');
        }
        return validationResult;
    },
    /**
     * Method for validation of each attribute
     * @param  {Array} attributes
     */
    validAttributes: function validAttributes(attributes) {
        let flag = true;
        for (let i = 0; i < attributes.length; i++) {
            let obj = attributes[i];
            if (typeof obj !== "object" ||
                !this.validString(obj.name) ||
                typeof obj.fixedValue !== 'string' ||
                typeof obj.textValue !== 'boolean') {
                flag = false;
                break;
            }
        }
        return flag;
    },
    /**
     * Method for validation of request object for creating formatted output
     * @param  {String} feed
     * @param  {Array} extractor
     */
    validateInput: function validateInput(feed, extractor) {
        return new Promise((resolve, reject) => {
            let validationResult = validator.checkInputFormat(feed, extractor);
            if (validationResult.length > 0) {
                return reject(validationResult);
            } else {
                return resolve();
            }
        });
    },
    /**
     * Method for validation of output from Module-1(feed) and Module-2(extractor)
     * which is the input to markup-generator module
     * @param  {String} feed
     * @param  {Array} extractor
     */
    checkInputFormat: function checkInputFormat(feed, extractor) {
        let validationResult = [];
        if (!this.validString(feed)) {
            validationResult.push('Invalid feed');
        }
        if (!Array.isArray(extractor) || !this.validExtractor(extractor, feed)) {
            validationResult.push('Invalid extractor');
        }
        return validationResult;
    },
    /**
     * Method for validation of each extractor object
     * @param  {Array} extractor
     * @param  {String} feed
     */
    validExtractor: function validExtractor(extractor, feed) {
        let feedLength = 0, flag = true;
        if (feed) {
            feedLength = feed.length;
        }
        for (let i = 0; i < extractor.length; i++) {
            let obj = extractor[i];
            if (!this.validIndex(obj.start, feedLength) ||
                !this.validIndex(obj.end, feedLength) ||
                obj.start > obj.end ||
                !this.validString(obj.concept)) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    /**
     * Method to check if start index and end index are valid
     * @param  {} index
     * @param  {} feedLength
     */
    validIndex: function validIndex(index, feedLength) {
        if (this.nullOrUndefined(index) || typeof index !== 'number' || this.outOfRange(index, feedLength)) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * Method that checks if start and end values are within range
     * @param  {number} val
     * @param  {number} arrLength
     */
    outOfRange: function outOfRange(val, arrLength) {
        if (val < 0 || val > arrLength) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * Method for checking if object is null/undefined/empty
     * @param  {Object} tempObj
     */
    nullOrUndefined: function nullOrUndefined(tempObj) {
        if (tempObj === null || tempObj === undefined || tempObj === '') {
            return true;
        }
        return false;
    },
    /**
     * Method to validate string
     * @param  {String} str
     */
    validString: function validString(str) {
        return !this.nullOrUndefined(str) && (typeof str === 'string' || str instanceof String);
    }
}

export const validateRule = validator.validateRule;
export const validateInput = validator.validateInput;