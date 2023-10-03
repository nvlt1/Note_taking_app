const http = require('http')
const url = require('url')
const fs = require('fs')

const dt = require('./modules/utils')

const port = 3000

// req: an object that contains info about http request
// res: an object used to specify what will be sent bakc to client
http.createServer((req, res) => {
    // parse the url from the request into an object
    // which gets stored in q variable, true means the query string, if any, wil be parsed into an object
    const q = url.parse(req.url, true)

    // .pathname accesses the path section of the URL
    if (q.pathname == "/COMP4537/Labs/3/writeFile/"){
        // calls appendFile method from node.js's fs (FILE SYSTEM)
        // 'file.txt' is the file the data will be appended to.
        // q.query['text'] is the 2nd argument, it's the data to append to the file
        fs.appendFile("file.txt", q.query["text"], (err) => {
            if (err) {
                console.log(err)
                res.writeHead(404, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                return res.end()
            }
            res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
            res.write(`<p style"color: blue;">File written successfully</p>`)
            console.log(`File write ${q.query["text"]}`)
            return res.end()
        })
    } else if (q.pathname.includes("readFile")) {
        //extracts the filename from the pathanme of the URL
        // Gets the substring from the last occurance of the '/' to the end of the string
        let file = q.pathname.substring(q.pathname.lastIndexOf('/') + 1)
        // utf8 is the encoding type that file should be read as UTF-8 encoded string
        // readFILE is method from Node.js which reads contents of the file,
        // it takes the 3 arguments below, data contains the file content if it was read successfully
        fs.readFile(file, "utf8", (err, data) => {
            if (err) {
                console.log(err)
                res.writeHead(404, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
                res.write(`404 - no such file or directory <br> ${q.pathname.substring(q.pathname.lastIndexOf('/') + 1)}`)
                return res.end()
            }
            res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
            res.write(`<p style="color: blue;>${data}</p>`)
            console.log(data)
            return res.end()
        })
    }
 else if (q.pathname == "/COMP4537/Labs/3/getDate/"){
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
    res.write(`<p style="color: blue;">Hello ${q.query["name"]}. What a beautiful day. Server current data and time is ${dt.date()}</p>`)
    return res.end()
 } else {
    res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'})
    res.write(`<p style="color: blue;">home page</p>`)
    return res.end()
 }

}).listen(port)

console.log("Server is running and listening on port: " + port)