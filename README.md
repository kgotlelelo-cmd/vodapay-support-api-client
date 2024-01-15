# vodapay-support-api-client

Javascript Library for interacting with VodaPay API for m-commerce.

## Installation

```
npm install vodapay-support-api-client
```
## Configuration
Before using the library, you need to configure it with your VodaPay API credentials. Use the config function to set the environment, client ID, merchant ID, and private key path.

```
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
```
const { userInfo } = require('vodapay-support-api-client');

const authCode = 'your_auth_code';

try {
    const result = await userInfo(authCode);
    console.log(result);
} catch (error) {
    console.error(error);
}
```

### Payment
```
const { pay } = require('vodapay-support-api-client');

const paymentDetails = {
    requestId: 'unique_request_id <string>',
    notifyUrl: 'your_notify_url <string>',
    expiryTime: 'expiry time <Number> indicating hours e.g 24',
    amount: 'payment_amount in cents <string>',
    goodsID: 'goods_identifier <string>',
    buyerID: 'buyer_identifier <string>',
    goodsname: 'default_goods_name <string>', // Optional
    orderDescription: 'default_order_description <string>' // Optional
};

try {
    const result = await pay(paymentDetails);
    console.log(result);
} catch (error) {
    console.error(error);
}
```

### Payment Information
```
const { paymentInfo } = require('vodapay-support-api-client');

const paymentId = 'your_payment_id <String>';

try {
    const result = await paymentInfo(paymentId);
    console.log(result);
} catch (error) {
    console.error(error);
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