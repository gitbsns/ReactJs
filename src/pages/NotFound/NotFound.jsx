import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button className="btn-main">
            <Link to="/">Go Home</Link>
          </Button>
        }
      />
    </div>
  );
};
export default NotFound;
