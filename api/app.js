import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'

import connectToDB from './db/mongoose.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

connectToDB().catch(error => {
  console.error(error)
  process.exit(1)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}!`)
})

export { app }
