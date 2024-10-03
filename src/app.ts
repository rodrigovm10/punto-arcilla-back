import express from 'express'
import { version } from 'os'

const app = express()

app.get('/', (req, res) => {
  res.send('working')
})

app.listen(3000, () => console.log(`Server running on http://localhost:${3000}`))
