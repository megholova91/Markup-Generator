import fs from 'fs';
import path from 'path';
const fileName = '../data/rules.json';

const ruleHelper = {
    /**
     * Method for creating/updating a concept with associated tag and attributes
     * @param  {String} concept
     * @param  {String} tag
     * @param  {Array} attributes
     */
    createRule: async function createRule(concept, tag, attributes){
        try {
            let ruleDetails = await this.getFileContent();
            ruleDetails = JSON.parse(ruleDetails);
            ruleDetails.rules[concept] = {tag, attributes}; 
            let response = await this.writeToFile(ruleDetails);
            return Promise.resolve(response);
        }catch(e) {
            return Promise.reject(e);
        }
    },
    /**
     * Method for fetching contents of rules.json
     */
    getFileContent: function getFileContent() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, fileName), (err, contents) => {
                if (err) { 
                    reject(err) 
                }else resolve(contents);
            })
        })
    },
    /**
     * Method for writing new/updated rule to rules.json
     * @param  {Object} ruleDetails
     */
    writeToFile: function writeToFile(ruleDetails) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, fileName), JSON.stringify(ruleDetails), (err) => {
                if (err) { 
                    reject(err) 
                }else resolve('Added new rule successfully');
            })
        })
    }
}

export default ruleHelper;