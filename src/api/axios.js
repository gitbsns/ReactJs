import axios from "axios";
import env from "../config/env";
import { message } from "antd";
import {
  apiMethods,
  errMessage,
  networkError,
  noInternet,
  statusCodes,
} from "config/constants";
import endpoints from "./endpoints";
import { decrypt, encrypt } from "utils/crypto";
import { store } from "store";
import { logout } from "slices/authSlice";

const api = axios.create({
  baseURL: env.baseURL,
});

api.interceptors.request.use(
  function (conf) {
    if (conf.url.includes("/pv/")) {
      conf.headers["Authorization"] = `Bearer ${decrypt("accessToken")}`;
    }

    return conf;
  },
  function (err) {
    return Promise.reject(err);
  }
);

let isToast = false;

api.interceptors.response.use(
  function (res) {
    if (res.data.code === 0) {
      if (apiMethods.includes(res.config.method)) {
        message.success(res.data.message, 2);
      }
    } else {
      if (apiMethods.includes(res.config.method)) {
        message.error(res.data.message, 2);
      }
    }

    return res;
  },
  async function (err) {
    if (err.code === networkError && !isToast) {
      message.error(noInternet, 2);
      isToast = true;
    }
    if (statusCodes.includes(err?.response?.status) && !isToast) {
      message.error(errMessage, 2);
      isToast = true;
    }

    if (err.response?.status === 401 && !err.config._retry) {
      const base64EncodedToken = btoa(decrypt("refreshToken"));

      const res = await api.get(endpoints.getNewRefreshToken, {
        params: {
          tokenModel: base64EncodedToken,
        },
      });

      if (res.data.code === 403) {
        store.dispatch(logout());
      }

      if (res.data.code === 0) {
        const { jwtToken, jwtRefreshToken } = res.data.result;

        encrypt("accessToken", jwtToken);
        encrypt("refreshToken", jwtRefreshToken);
      }

      const oldRequest = err.config;
      oldRequest._retry = true;
      oldRequest.headers["Authorization"] = `Bearer ${decrypt("accessToken")}`;
      return api(oldRequest);
    }

    return Promise.reject(err);
  }
);

export default api;
