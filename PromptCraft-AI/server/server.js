import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import generateRoutes from './routes/generateRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { logger } from './utils/logger.js'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

// CORS — allow the Vite dev server and any configured origins
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Parse incoming JSON bodies
app.use(express.json())

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api', generateRoutes)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' })
})

// ---------------------------------------------------------------------------
// Global error handler (must be registered AFTER routes)
// ---------------------------------------------------------------------------
app.use(errorHandler)

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  logger.info(`Health check: http://localhost:${PORT}/health`)
})

export default app
