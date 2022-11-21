const fs = require('fs');
const { parse } = require('csv-parse');

/**
* 
*  
*/
function getData(page = 0, pagination = 20) {
    return new Promise((resolve, reject) => {
        const rows = [];

        const parseOptions = {
            delimiter: ",",
            from_line: (page * pagination) + 1,
            to_line: (page * pagination + pagination) + 1
        }

        fs.createReadStream('./metal_bands_2017.csv')
            .pipe(parse(parseOptions))
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (error) => {
                reject(error);
            })
    });
}

module.exports = { getData };