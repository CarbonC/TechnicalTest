const fs = require('fs');
const { parse } = require('csv-parse');

/**
* 
*  
*/
function getData(page = 0, records) {
    return new Promise((resolve, reject) => {
        const rows = [];

        const parseOptions = {
            columns: true,
            delimiter: ",",
            from_line: 1,
            to_line: records
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