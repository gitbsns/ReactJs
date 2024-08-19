import { Spin } from "antd";
import env from "config/env";
import ErrorBoundary from "ErrorBoundary/ErrorBoundary";
import BottomHeaderContainer from "layouts/Header/BottomHeader/BottomHeaderContainer";
import TopHeaderContainer from "layouts/Header/TopHeader/TopHeaderContainer";
import Sidebar from "layouts/Sidebar/Sidebar";
import { Suspense } from "react";

const Layout = ({ children }) => {
  const isDev = env.nodeENV === "development";

  const Content = (
    <>
      <header>
        <TopHeaderContainer />
        <BottomHeaderContainer />
      </header>

      <aside>
        <Sidebar />
      </aside>

      <main className="mt-[92px] ml-[41px] p-5">
        <Suspense
          fallback={
            <div className="flex w-screen items-center justify-center h-screen -mt-[92px] -ml-[41px]">
              <Spin tip="Loading" size="large" />
            </div>
          }
        >
          <section>{children}</section>
        </Suspense>
      </main>
    </>
  );

  return isDev ? Content : <ErrorBoundary>{Content}</ErrorBoundary>;
};

export default Layout;
