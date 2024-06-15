import express from 'express'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected!')
  })
  .catch((err) => {
    console.log(err)
  })

// The current working directory of the Node.js process i.e. the folder from where the Node.js process was launched
const __dirname = path.resolve()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
  console.log('Server is running on port 3000!')
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

// Serve static files from the client/dist directory.
// 'npm run build' generates the bundled output files here.
app.use(express.static(path.join(__dirname, '/client/dist')))

// For any request that doesn't match the preceeding API routes, the server will respond by sending the index.html file from the client/dist directory.
// This is crucial for client-side routing in single-page applications (SPAs). When the user navigates to a different route (e.g., /about or /dashboard), the server will serve index.html, and the client-side JavaScript will take over and handle the routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
