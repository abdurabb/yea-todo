const express = require('express')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const connectDB = require('./connection/mongoConnection')

const app = express()
const server = http.createServer(app)

// ---------------- CONFIG ----------------
app.set('trust proxy', true)

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Static files (optional)
app.use(express.static(path.join(__dirname, 'public')))

// ---------------- DATABASE ----------------
connectDB()

// ---------------- ROUTES ----------------
app.use('/user', require('./routes/userRoute.js'))


// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() })
})

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 8686
const HOST = process.env.HOST_NAME || 'localhost'

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`)
})
