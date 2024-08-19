import { Result } from "antd";
import styles from "./wentWrong.module.css";

const SomethingWentWrong = () => {
  return (
    <div className="h-[75vh] flex justify-center items-center">
      <Result
        className={`${styles.wentWrong}`}
        status="500"
        subTitle="Oops! Something went wrong."
      />
    </div>
  );
};
export default SomethingWentWrong;
