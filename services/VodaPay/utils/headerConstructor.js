const { DateTime } = require('luxon');

const signature = require('./signature');
const { getConfig } = require('../../../config');

const headerContructor = (method, endPoint, bodyData, isRequest = true) => {

    const { VODAPAY_CLIENT_ID } = getConfig();

    const timeStampKey = isRequest ? 'request-time' : 'response-time'
    const now = DateTime.now();
    const time = now.toISO('yyyy-MM-ddTHH:mm:ssZZ');
    const signatureValue = signature.generate(method, endPoint, time, bodyData);
    const headers = {
        'Content-Type': 'application/json',
        'client-id': VODAPAY_CLIENT_ID,
        'signature': `algorithm=RSA256, keyVersion=1, signature=${signatureValue}`
    };

    headers[timeStampKey] = time;

    return headers;
}

module.exports = headerContructor