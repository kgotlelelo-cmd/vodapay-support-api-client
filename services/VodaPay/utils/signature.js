const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { getConfig } = require('../../../config');

const generatePayload = (method, endPoint, time, body) => {

    const { VODAPAY_CLIENT_ID } = getConfig();

    const unsignedPayload = `${method} ${endPoint}\n${VODAPAY_CLIENT_ID}.${time}.${JSON.stringify(body)}`;
    return unsignedPayload;
}

const generate = (method, endPoint, requestTime, body) => {

    const { PRIVATE_KEY_PATH } = getConfig();

    const privateKeyFile = path.join(path.dirname(require.main.filename), PRIVATE_KEY_PATH);
    const privateKeyData = fs.readFileSync(privateKeyFile, "utf8");

    const privateKeyObj = crypto.createPrivateKey(privateKeyData, "utf8");
    const unsignedPayload = generatePayload(method, endPoint, requestTime, body);
    const signer = crypto.createSign("RSA-SHA256");
    signer.write(unsignedPayload);
    signer.end();

    const signature = signer.sign(privateKeyObj, "base64");
    return signature;
}

module.exports = {
    generate
}