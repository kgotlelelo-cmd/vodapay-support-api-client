const axios = require('axios');
const headerContructor = require('./headerConstructor');
const { getConfig } = require('../../../config');

const request = async (method, endPoint, data) => {
    
    const { VODAPAY_BASEURL } = getConfig();

    return await axios({
        method: method,
        url: `${VODAPAY_BASEURL}${endPoint}`,
        data: data,
        headers: headerContructor(method, endPoint, data)
    })
}

module.exports = request;