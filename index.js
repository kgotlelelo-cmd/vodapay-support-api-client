    const { VodaPay } = require('./services');
    const { config } = require('./config');

    const userInfo = async (authCode) => {
        try {
            const applyTokenResponse = await VodaPay.V2.applyToken(authCode);

            if (applyTokenResponse.result.resultCode !== 'SUCCESS') {
                return {
                    results: "fail",
                    error: {
                        code: applyTokenResponse.result.resultStatus,
                        message: applyTokenResponse.result.resultMessage
                    }
                };
            }

            const userInfoResponse = await VodaPay.V2.inquiryUserInfo(applyTokenResponse.accessToken);
            return {
                results: "success",
                userInfo: {
                    userID: userInfoResponse.userInfo.userId || "",
                    username: userInfoResponse.userInfo.nickName || "",
                    firstname: userInfoResponse.userInfo.userName?.firstName || "",
                    lastname: userInfoResponse.userInfo.userName?.lastName || "",
                    email: userInfoResponse.userInfo.contactInfos.find(info => info.contactType === "EMAIL")?.contactNo || "",
                    phone: userInfoResponse.userInfo.contactInfos.find(info => info.contactType === "MOBILE_PHONE")?.contactNo || ""
                }
            };

        } catch (error) {
            return {
                results: "fail",
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'An internal error occurred while processing the request.'
                }
            };
        }
    };

    const pay = async ({
        requestId,
        notifyUrl,
        expiryTime,
        amount,
        goodsID,
        buyerID,
        goodsname = "default",
        oderDescription = "default"
    }) => {
        try {
            const payResponse = await VodaPay.V2.pay(requestId, notifyUrl, expiryTime, amount, goodsID, buyerID, goodsname, oderDescription);

            if (payResponse.result.resultStatus !== 'A' && payResponse.result.resultStatus !== 'S') {
                return {
                    results: "fail",
                    error: {
                        code: payResponse.result.resultStatus,
                        message: payResponse.result.resultMessage
                    }
                };
            }

            return {
                results: "success",
                paymentID: payResponse?.paymentId || "",
                redirectUrl: payResponse.redirectActionForm?.redirectUrl || ""
            };

        } catch (error) {
            return {
                results: "fail",
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'An internal error occurred while processing the request.'
                }
            };
        }
    };

    const paymentInfo = async (paymentId) => {
        try {
            const paymentInfoResponse =  await VodaPay.V2.inquiryPayment(paymentId);
            return paymentInfoResponse;
        } catch (error) {
            return {
                results: "fail",
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'An internal error occurred while processing the request.'
                }
            };
        }
    }

    module.exports = { config, userInfo, pay, paymentInfo };