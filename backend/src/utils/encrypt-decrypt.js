const crypto = require('crypto');

const ENCRYPT_KEY = 'BjB[bY<-4Q@q.^QRCj.F@!5&svL+{e,E'; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from(ENCRYPT_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (text) => {
  const textParts = text.split(':');
  const iv = new Buffer.from(textParts.shift(), 'hex');
  const encryptedText = new Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer.from(ENCRYPT_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};

const verify = (text, encryptText) => {
  const decryptText = decrypt(encryptText);
  if (decryptText === text) {
    return true;
  }
  return false;
};

export default { encrypt, verify };
