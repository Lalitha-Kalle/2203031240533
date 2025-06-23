const axios = require('axios');

const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

// Allowed values (as per constraints)
const validStacks = ['backend', 'frontend'];
const validLevels = ['info', 'warning', 'error'];
const validPackages = ['handler', 'middleware', 'service'];

async function Log(stack, level, packageName, message) {
    // Validate input
    if (
        !validStacks.includes(stack) ||
        !validLevels.includes(level) ||
        !validPackages.includes(packageName)
    ) {
        console.error('Invalid log parameters');
        return;
    }

    const logData = {
        stack,
        level,
        package: packageName,
        message
    };

    try {
        const response = await axios.post(LOG_API_URL, logData);
        console.log('Log response:', response.data);
    } catch (error) {
        console.error('Error logging data:', error.message);
    }
}

module.exports = Log;
