const endPoints = {
    v2: {
        applyToken: '/v2/authorizations/applyToken',
        inquiryUserInfo: '/v2/customers/user/inquiryUserInfo',
        inquiryPayment: '/v2/payments/inquiryPayment',
        pay: '/v2/payments/pay'
    },
    v3: {
        inquiryPayment: '/v3/payments/inquiryPayment',
    }
}

module.exports = endPoints;