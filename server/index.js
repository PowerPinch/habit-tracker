const R = require('ramda')

const http = require('http')
const uuid = require('uuid/v4')
let itemList = []

const parseRequest = (req, res, callback) => {
  let payload = ''
  req.setEncoding('utf8')
  req.on('data', chunk => {
    payload += chunk
  })
  req.on('end', () => {
    try {
      const body = JSON.parse(payload)
      callback(body)
    } catch (e) {
      res.writeHead(400)
      res.end()
    }
  })
}
const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'PUT':
      const itemId = req.url.slice(1)
      parseRequest(req, res, ({ item: newItem }) => {
        itemList = R.map(
          ({ item, id }) =>
            id === itemId ? { item: newItem, id } : { item, id },
          itemList
        )
        res.end()
      })
      break
    case 'POST':
      parseRequest(req, res, ({ item }) => {
        itemList.push({ item, id: uuid() })
        res.end()
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
