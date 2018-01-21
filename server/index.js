const R = require('ramda')
const express = require('express')
const uuid = require('uuid/v4')

let itemList = []
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  res.json(itemList).end()
})
app.post('/', (req, res) => {
  const { item } = req.body
  itemList.push({ item, id: uuid() })
  res.end()
})
app.put('/:itemId', (req, res) => {
  const { item: newItem } = req.body
  const itemHasId = R.propEq('id', req.params.itemId)
  const index = R.findIndex(itemHasId, itemList)
  if (index < 0) {
    res.status(404).end()
  } else {
    itemList = R.update(
      index,
      { item: newItem, id: req.params.itemId },
      itemList
    )
    res.end()
  }
})
app.delete('/:itemId', (req, res) => {
  itemList = R.reject(({ item, id }) => id === req.params.itemId, itemList)
  res.end()
})
app.listen(3000)
