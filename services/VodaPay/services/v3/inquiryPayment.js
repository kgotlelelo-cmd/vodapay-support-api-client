const endpoints = require('../../constants/endpoints');
const request = require('../../utils/request');

const inquiryPayment = async (paymentId) => {
    const body = { "paymentId": paymentId };
    const method = 'POST';
    const endPoint = endpoints.v3.inquiryPayment;

    const response = await request(method, endPoint, body);

    return response.data;
}

module.exports = inquiryPayment