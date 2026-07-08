/**
 * logger.js — Lightweight console logger with timestamps and log levels.
 *
 * Usage:
 *   import { logger } from './utils/logger.js'
 *   logger.info('Server started')
 *   logger.warn('Deprecation warning')
 *   logger.error('Something went wrong')
 */

const getTimestamp = () => new Date().toISOString()

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  info: '\x1b[36m',    // cyan
  warn: '\x1b[33m',    // yellow
  error: '\x1b[31m',   // red
  success: '\x1b[32m', // green
}

function formatMessage(level, message) {
  const timestamp = getTimestamp()
  const color = COLORS[level] || COLORS.reset
  return `${COLORS.dim}[${timestamp}]${COLORS.reset} ${color}[${level.toUpperCase()}]${COLORS.reset} ${message}`
}

export const logger = {
  /**
   * info — General informational messages.
   * @param {string} message
   */
  info(message) {
    console.log(formatMessage('info', message))
  },

  /**
   * warn — Non-critical warnings.
   * @param {string} message
   */
  warn(message) {
    console.warn(formatMessage('warn', message))
  },

  /**
   * error — Error messages.
   * @param {string} message
   */
  error(message) {
    console.error(formatMessage('error', message))
  },

  /**
   * success — Success confirmation messages.
   * @param {string} message
   */
  success(message) {
    console.log(formatMessage('success', message))
  },
}

export default logger
