const http = require('http');
const fs = require('fs');
const qs = require('qs')
const server = http.createServer( (req, res)=> {
    if (req.method === 'GET') {
        fs.readFile('./view/register.html',  (err, data)=> {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./view/info.html', 'utf8',  (err, dataHTML)=> {
                if (err) {
                    console.log(err.message);
                }
                dataHTML = dataHTML.replace('{name}', userInfo.name);
                dataHTML  = dataHTML.replace('{email}', userInfo.email);
                dataHTML  = dataHTML.replace('{password}', userInfo.password);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dataHTML);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080,'localhost', ()=> {
    console.log('server running')
});
