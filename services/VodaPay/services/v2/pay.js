const { DateTime } = require('luxon');

const endpoints = require('../../constants/endpoints');
const request = require('../../utils/request');


const pay = async (requestId, notifyUrl, expiryTime, amountInCents, goodsID, buyerID, goodsname, oderDescription) => {

    const expirey = DateTime.now().plus({ hours: expiryTime })
    const paymentExpirey = expirey.toISO('yyyy-MM-ddTHH:mm:ssZZ');
    const method = 'POST';
    const endPoint = endpoints.v2.pay;

    const body = {
        productCode: "CASHIER_PAYMENT",
        salesCode: "51051000101000000011",
        paymentNotifyUrl: `${notifyUrl}`,
        paymentRequestId: requestId,
        paymentExpiryTime: paymentExpirey,
        paymentAmount: {
            currency: "ZAR",
            value: `${amountInCents}`,
        },
        order: {
            goods: {
                referenceGoodsId: goodsID,
                goodsUnitAmount: {
                    currency: "ZAR",
                    value: `${amountInCents}`,
                },
                goodsName: goodsname,
            },
            env: {
                terminalType: "MINI_APP",
            },
            orderDescription: oderDescription,
            buyer: {
                referenceBuyerId: buyerID,
            },
        },
    }
    const response = await request(method, endPoint, body);

    return response.data;
}

module.exports = pay;