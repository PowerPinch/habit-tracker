const http = require('http')
const uuid = require('uuid/v4')
const itemList = []
const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      let payload = ''
      req.setEncoding('utf8')
      req.on('data', chunk => {
        payload += chunk
      })
      req.on('end', () => {
        try {
          let { item } = JSON.parse(payload)
          itemList.push({ item, id: uuid() })
        } catch (e) {
          res.writeHead(400)
        } finally {
          res.end()
        }
      })
      break
    case 'GET':
      res.end(JSON.stringify(itemList))
      break
    default:
      res.writeHead(404)
      res.end()
  }
})
server.listen(3000)
