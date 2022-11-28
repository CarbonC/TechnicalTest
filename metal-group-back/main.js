const http = require('http');

const host = '0.0.0.0'
const port = 5000

const csvToJson = require('csvtojson')

const server = http.createServer((req, res) => {
	csvToJson()
	.fromFile('../metal_bands_2017.csv')
	.then(data => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(data));
	})
	.catch(err=> {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain');
		res.end(err);
	})
});

server.listen(port, host, ()=> {
	console.log('Web server running at http://%s:%s',host,port );
});
