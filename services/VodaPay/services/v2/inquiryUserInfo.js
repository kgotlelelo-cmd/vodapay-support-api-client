const endpoints = require('../../constants/endpoints');
const request = require('../../utils/request');
const { getConfig } = require('../../../../config');

const inquiryUserInfo = async (accessToken) => {

    const { VODAPAY_CLIENT_ID } = getConfig();
    
    const body = { "authClientId": VODAPAY_CLIENT_ID, "accessToken": accessToken };
    const method = 'POST';
    const endPoint = endpoints.v2.inquiryUserInfo;

    const response = await request(method, endPoint, body);

    return response.data;
}

module.exports = inquiryUserInfo;