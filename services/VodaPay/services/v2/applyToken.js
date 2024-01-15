const endpoints = require('../../constants/endpoints');
const request = require('../../utils/request');

const applyToken = async (authCode, isRefresh = false) => {
    const refreshBody = { "grantType": "REFRESH_TOKEN", "refreshToken": authCode };
    const authBody = { "grantType": "AUTHORIZATION_CODE", "authCode": authCode };
    const body = isRefresh ? refreshBody : authBody;
    const method = 'POST';
    const endPoint = endpoints.v2.applyToken;
    const response = await request(method, endPoint, body);
    return response.data;
}

module.exports = applyToken