import env from "config/env";
import CryptoJS from "crypto-js";

export const encrypt = (key, data) =>
  localStorage.setItem(
    key,
    CryptoJS.AES.encrypt(data, env.cryptoJsKey).toString()
  );

export const decrypt = (key) => {
  const data = localStorage.getItem(key);
  return CryptoJS.AES.decrypt(data, env.cryptoJsKey).toString(
    CryptoJS.enc.Utf8
  );
};
