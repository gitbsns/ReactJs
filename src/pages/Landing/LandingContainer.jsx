import { useEffect, useState } from "react";
import env from "config/env";
import CryptoJS from "crypto-js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "slices/authSlice";
import Landing from "./Landing";
import { encrypt } from "utils/crypto";
import axios from "axios";
import endpoints from "api/endpoints";
import useAuth from "hooks/useAuth";
import { setAppointment } from "slices/appointmentSlice";

const LandingContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const [userData, setUserData] = useState({});

  const { isAuthenticated } = useAuth();

  const encryptURL = (currentURL) => {
    return CryptoJS.AES.encrypt(currentURL, env.encryptKey).toString();
  };

  const handleLogin = () => {
    const currentURL = window.location.href;
    const encryptedURL = encryptURL(currentURL);

    const redirectObject = {
      encryptedURL: encryptedURL,
      targetURL: env.redirectionURL,
    };

    const redirectURL = `${
      env.redirectionURL
    }?redirectInfo=${encodeURIComponent(JSON.stringify(redirectObject))}`;
    window.location.href = redirectURL;
  };

  const redirectInfoParam = searchParams.get("encryptedData");
  const decodedRedirectInfo = decodeURIComponent(redirectInfoParam);
  const redirectObject = JSON.parse(decodedRedirectInfo);

  useEffect(() => {
    if (redirectObject) {
      const user = JSON.parse(
        CryptoJS.AES.decrypt(redirectObject.user, env.decryptKey).toString(
          CryptoJS.enc.Utf8
        )
      );

      const accessToken = CryptoJS.AES.decrypt(
        redirectObject.token,
        env.decryptKey
      ).toString(CryptoJS.enc.Utf8);

      const refreshToken = CryptoJS.AES.decrypt(
        redirectObject.jwtRefreshToken,
        env.decryptKey
      ).toString(CryptoJS.enc.Utf8);

      encrypt("accessToken", accessToken);
      encrypt("refreshToken", refreshToken);

      dispatch(setUser(user));
    }
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/create-invoice");
    }
    setIsShow(true);
  }, [navigate, isAuthenticated]);

  const appointmentDetails = JSON.parse(searchParams.get("redirectInfo"));

  useEffect(() => {
    if (appointmentDetails && !isAuthenticated) {
      const businessId = JSON.parse(
        CryptoJS.AES.decrypt(
          appointmentDetails.businessId,
          env.appointmentKey
        ).toString(CryptoJS.enc.Utf8)
      );

      const encryptedURL = CryptoJS.AES.decrypt(
        appointmentDetails.encryptedURL,
        env.appointmentKey
      ).toString(CryptoJS.enc.Utf8);

      const invoiceDetail = JSON.parse(
        CryptoJS.AES.decrypt(
          appointmentDetails.invoiceDetail,
          env.appointmentKey
        ).toString(CryptoJS.enc.Utf8)
      );

      const userDetail = JSON.parse(
        CryptoJS.AES.decrypt(
          appointmentDetails.userDetail,
          env.appointmentKey
        ).toString(CryptoJS.enc.Utf8)
      );

      setAppointmentData({
        businessId,
        encryptedURL,
        appointmentId: invoiceDetail.appointmentId,
        plexaarBookingId: invoiceDetail.plexaarBookingId,
        userId: userDetail.id,
        accessToken: userDetail.accessToken,
        refreshToken: userDetail.refreshToken,
      });
    }
  }, []);

  const handleUserData = async () => {
    try {
      const res = await axios.get(`${env.baseURL}${endpoints.getUserById}`, {
        params: {
          id: appointmentData.userId,
        },
        headers: {
          Authorization: `Bearer ${appointmentData.accessToken}`,
        },
      });
      const { code } = res.data;
      if (code === 0) {
        const { user } = res.data.result;
        setUserData((prev) => ({
          ...prev,
          ...user,
          businssId: appointmentData.businessId,
        }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    const keysLength = Object.keys(appointmentData)?.length;
    if (keysLength) {
      handleUserData();
      dispatch(
        setAppointment({
          appointmentUserId: appointmentData.id,
          appointmentBusinessId: appointmentData.businessId,
          appointmentId: appointmentData.appointmentId,
          plexaarBookingId: appointmentData.plexaarBookingId,
          encryptedURL: appointmentData.encryptedURL,
        })
      );
    }
  }, [appointmentData]);

  useEffect(() => {
    const keysLength = Object.keys(userData)?.length;
    if (keysLength) {
      dispatch(setUser(userData));
      encrypt("accessToken", appointmentData.accessToken);
      encrypt("refreshToken", appointmentData.refreshToken);
      navigate("/create-invoice");
    }
  }, [userData, dispatch]);

  return !appointmentDetails ? (
    <div className="bg-[#e9f4fa]">
      <Landing isShow={isShow} handleLogin={handleLogin} />
    </div>
  ) : (
    ""
  );
};
export default LandingContainer;
