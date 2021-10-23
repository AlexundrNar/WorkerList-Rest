const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()

let coWorker = [
  {id: v4(), name: 'Alex', value: 20000, marked: false}, 
  {id: v4(), name: 'Rudolph', value: 13317, marked: false} 
]

app.use(express.json())

app.get('/api/coWorker', (req, res) => {
  res.status(200).json(coWorker)
})

app.post('/api/coWorker', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false}
  coWorker.push(contact)
  res.status(201).json(contact)
})

app.put('/api/coWorker/:id', (req, res) => {
  const idx = coWorker.findIndex(c => c.id === req.params.id)
  coWorker[idx] = req.body
  res.status(200).json(coWorker[idx])
})

app.delete('/api/coWorker/:id', (req, res) => {
  coWorker = coWorker.filter(c => c.id !== req.params.id)
  res.status(200).json({message: 'human deleted'})
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server start port 3000...'))