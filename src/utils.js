const cryptoJs = require('crypto-js');

const generateGuid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
const prePad = (i='', n=2, z='0') => i.toString().padStart(n, z);

const jsDateToMySqlDate = dateString => {
    const dt = new Date(dateString);
    return `${dt.getFullYear()}-${prePad(dt.getMonth()+1)}-${prePad(dt.getDate())}`;
};

const isBase64 = value => /^data:image\/\w+;base64,/.test(value);

const comparePassword = (value, nonce, user) => {
    const userPassword = cryptoJs.AES.decrypt(user.password, nonce).toString(cryptoJs.enc.Utf8);
    const valuePassword = cryptoJs.AES.decrypt(value, nonce).toString(cryptoJs.enc.Utf8);
    return userPassword === valuePassword;
}

module.exports = { generateGuid, prePad, comparePassword, isBase64, jsDateToMySqlDate };
