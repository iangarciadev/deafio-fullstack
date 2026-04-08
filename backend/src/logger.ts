import pino from 'pino'
import path from 'path'
import fs from 'fs'

const logsDir = path.resolve(__dirname, '..', 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

const logFile = path.join(logsDir, 'app.log')
const isDev = process.env.NODE_ENV !== 'production'

const logger = pino(
  { level: 'info' },
  pino.transport({
    targets: [
      {
        target: 'pino/file',
        options: { destination: logFile, append: true } as object,
        level: 'info',
      },
      {
        target: isDev ? 'pino-pretty' : 'pino/file',
        options: isDev
          ? { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' }
          : { destination: 1 },
        level: 'info',
      },
    ],
  })
)

export default logger
