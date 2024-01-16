# vodapay-support-api-client

Javascript Library for interacting with VodaPay API for m-commerce.

## Installation

```bash
npm install vodapay-support-api-client
```
## Configuration
Before using the library, you need to configure it with your VodaPay API credentials. Use the config function to set the environment, client ID, merchant ID, and private key path.

```JavaScript
const { config } = require('vodapay-support-api-client');

config({
    environment: 'sandbox', // Options: 'sandbox', 'production', 'test4'
    clientID: 'your_client_id',
    merchantID: 'your_merchant_id',
    privateKeyPath: 'path_to_your_private_key.pem'
});
```

## Usage
### User Information
```JavaScript
const { userInfo } = require('vodapay-support-api-client');

const authCode = 'your_auth_code';

try {
    const result = await userInfo(authCode);
    console.log(result);
} catch (error) {
    console.error(error);
}


Responses:
{
    results: "success",
    userInfo: {
        userID: "user_id",
        username: "nickname_of_the_user",
        firstname: "firstname_of_the_user",
        lastname: "lastname_of_the_user",
        email: "registered_email_of_the_user",
        phone: "registered_phone_number_of_the_merchant"
    }
}

{
    results: "fail",
    error: {
        code: "error_code",
        message: "Error description or message"
    }
}

```

### Payment
```JavaScript
const { pay } = require('vodapay-support-api-client');

const paymentDetails = {
    requestId: 'unique_request_id <string>',
    notifyUrl: 'your_notify_url <string>',
    expiryTime: 'expiry time <Number> indicating hours e.g 24',
    amount: 'payment_amount in cents <string>',
    goodsID: 'goods_identifier <string>',
    buyerID: 'buyer_identifier (userID from userInfo) <string>',
    goodsname: 'default_goods_name <string>', // Optional
    orderDescription: 'default_order_description <string>' // Optional
};

try {
    const result = await pay(paymentDetails);
    console.log(result);
} catch (error) {
    console.error(error);
}

Responses:
{
    results: "success",
    paymentID: "unique_payment_identifier",
    redirectUrl: "URL_for_redirect_with_my_tradePay_invocation"
}

{
    results: "fail",
    error: {
        code: "payment_error_code",
        message: "Payment processing failed. Please check your payment details and try again. (example)"
    }
}
```

### Payment Information
```JavaScript
const { paymentInfo } = require('vodapay-support-api-client');

const paymentId = 'your_payment_id <String>';

try {
    const result = await paymentInfo(paymentId);
    console.log(result);
} catch (error) {
    console.error(error);
}

Responses
{
    paymentId: "20211125111212800100166762900183970",
    paymentRequestId: "c63ce9ce-abf0-40a6-a04f-0c55a63863d1",
    paymentAmount: {
        currency: "ZAR",
        value: "6234"
    },
    paymentStatus: "PROCESSING",
    result: {
        resultStatus: "S",
        resultCode: "SUCCESS",
        resultMessage: "Success."
    }
}

{
    results: "fail",
    error: {
        code: "error_code",
        message: "error message"
    }
}
```

## Dependencies

This library relies on the following dependencies.

axios: HTTP client for making API requests.\
luxon: Library for handling dates and times.\
uuid: Library for generating and parsing UUIDs.

## Contributing
If you would like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License
This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.