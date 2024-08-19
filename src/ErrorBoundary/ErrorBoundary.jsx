import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary as ErrBoundary } from "react-error-boundary";
import { startTransition } from "react";

const ErrorBoundary = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    startTransition(() => {
      navigate("/");
    });
  };

  const Fallback = () => (
    <div className="h-screen flex justify-center items-center">
      <Result
        className="h-screen w-screen flex items-center flex-col justify-center"
        status="error"
        title="Oops! Something went wrong."
        subTitle="An error occurred while rendering this page."
        extra={[
          <Button className="btn-main" key="home" onClick={handleNavigate}>
            Go Home
          </Button>,
        ]}
      />
    </div>
  );

  return <ErrBoundary FallbackComponent={Fallback}>{children}</ErrBoundary>;
};

export default ErrorBoundary;
