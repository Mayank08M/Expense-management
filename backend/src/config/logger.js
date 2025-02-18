const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('./config');

// Helper to get current date string for log file naming
const getCurrentDateString = () => new Date().toISOString().split('T')[0];

// Ensure the log directory exists
const ensureLogDirExists = (logDir) => {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
};

// Dynamic log file transport creation (daily logs)
const createFileTransport = (level) => {
    const logDir = path.join(
        path.resolve(__dirname, '../..'),
        'logs',
        getCurrentDateString()
    );
    ensureLogDirExists(logDir);

    return new winston.transports.File({
        filename: path.join(logDir, `${level}-${getCurrentDateString()}.log`),
        level,
    });
};

// Create logger with conditional file transports for production
const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({ stderrLevels: ['error'] }), // Always log to console in development
        config.env === 'production' && createFileTransport('info'),
        config.env === 'production' && createFileTransport('error'),
        config.env === 'production' && createFileTransport('warn'),
    ].filter(Boolean), // Filter out null transports in development
});

module.exports = logger;
