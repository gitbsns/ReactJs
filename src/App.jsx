import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "pages/NotFound/NotFound";
import Layout from "layouts/Layout/Layout";
import routes from "routes/routes";
import useAuth from "hooks/useAuth";
import { Suspense, useEffect, useRef } from "react";
import { Spin } from "antd";
import PrivateRoute from "routes/auth/PrivateRoute";
import PublicRoute from "routes/auth/PublicRoute";
import env from "config/env";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { encrypt } from "utils/crypto";
import { setAppointment } from "slices/appointmentSlice";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const {
    appointmentId,
    plexaarBookingId,
    appointmentUserId,
    appointmentBusinessId,
  } = useSelector((state) => state.appointment.appointment);

  const toRedirect = () => (
    <Navigate to={isAuthenticated ? "/create-invoice" : "/"} />
  );

  const processRoutes = () => {
    return routes.map((route) => {
      const routeElement = <route.element />;
      return {
        ...route,
        element: route.private ? (
          <PrivateRoute>
            <Layout>{routeElement}</Layout>
          </PrivateRoute>
        ) : (
          <PublicRoute>{routeElement}</PublicRoute>
        ),
      };
    });
  };

  const processedRoutes = processRoutes();

  processedRoutes.push({
    path: "*",
    element: (isAuthenticated || !isAuthenticated) && <NotFound />,
  });

  processedRoutes.push({
    path: "/",
    element: toRedirect(),
  });

  const router = createBrowserRouter(processedRoutes);

  // appointments

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const redirectInfo = urlParams.get("redirectInfo");
  const appointmentDetails = redirectInfo ? JSON.parse(redirectInfo) : null;

  useEffect(() => {
    if (appointmentDetails && isAuthenticated) {
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

      encrypt("accessToken", userDetail.accessToken);
      encrypt("refreshToken", userDetail.refreshToken);

      dispatch(
        setAppointment({
          appointmentUserId: userDetail.id,
          appointmentBusinessId: businessId,
          appointmentId: invoiceDetail.appointmentId,
          plexaarBookingId: invoiceDetail.plexaarBookingId,
          encryptedURL,
        })
      );
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex w-screen items-center justify-center h-screen">
          <Spin tip="Loading" size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
