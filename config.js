const configurations = {
    VODAPAY_BASEURL: '',
    PRIVATE_KEY_PATH: '/certificates/rsa_private_key.pem',
    VODAPAY_CLIENT_ID: '',
    VODAPAY_MERCHANT_ID: ''
};

const validateEnvironment = (environment) => {
    if (environment !== 'sandbox' && environment !== 'production' && environment !== 'test4') {
        throw new Error('Invalid environment. Please use either "sandbox", "production", or "test4".');
    }
};

const setVodapayBaseUrl = (environment) => {
    switch (environment) {
        case 'sandbox':
            configurations.VODAPAY_BASEURL = 'https://vodapay-gateway.sandbox.vfs.africa';
            break;
        case 'production':
            configurations.VODAPAY_BASEURL = 'https://gateway.vodapay.vodacom.co.za';
            break;
        case 'test4':
            configurations.VODAPAY_BASEURL = 'https://vodapay-gateway.test4.vfs.africa';
            break;
        default:
            throw new Error('Invalid environment. Please use either "sandbox", "production", or "test4".');
    }
};

const config = ({ environment, clientID, merchantID, privateKeyPath }) => {
    validateEnvironment(environment);
    setVodapayBaseUrl(environment);

    configurations.VODAPAY_CLIENT_ID = clientID;
    configurations.VODAPAY_MERCHANT_ID = merchantID;
    configurations.PRIVATE_KEY_PATH = privateKeyPath;
};

const getConfig = () => ({ ...configurations });

module.exports = {
    config,
    getConfig
};