import { logger } from '../utils/logger.js'

/**
 * errorHandler — Global Express error-handling middleware.
 * Must be registered AFTER all routes in server.js.
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500

  logger.error(`[${req.method}] ${req.path} — ${statusCode}: ${err.message}`)

  // Don't leak stack traces in production
  const isDev = process.env.NODE_ENV !== 'production'

  return res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  })
}
