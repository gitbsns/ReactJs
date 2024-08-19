import { Checkbox, Divider, Input } from "antd";
import styles from "./sendTo.module.css";
import { PhoneInput } from "react-international-phone";

const SendTo = ({
  emailId,
  emailCheckbox,
  handleChangeEmailCheckbox,
  email,
  handleChangeEmail,
  mobileId,
  mobileCheckbox,
  handleChangeMobileCheckbox,
  mobile,
  handleChangeMobile,
  whatsappId,
  whatsapp,
  handleChangeWhatsapp,
}) => {
  return (
    <div
      className={`bg-white rounded-lg px-2 border custom-border ${styles.sendTo}`}
    >
      <div className="h-12 -mb-5">
        <div className="flex justify-between items-center">
          <label className="text-[10px] pt-1 text-grey-light" htmlFor={emailId}>
            Email
          </label>
          <Checkbox
            id={emailId}
            className="pt-1"
            checked={emailCheckbox}
            onChange={handleChangeEmailCheckbox}
          />
        </div>
        <Input
          className={`px-0 ${styles.input} placeholder:text-grey`}
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={handleChangeEmail}
          bordered={false}
        />
      </div>
      <Divider />
      <div className="h-12 -mb-[10px] -mt-6">
        <div className="flex justify-between items-center -mt-6">
          <label
            className="text-[10px] pt-1 text-grey-light"
            htmlFor={mobileId}
          >
            Text
          </label>
          <Checkbox
            id={mobileId}
            className="pt-1"
            checked={mobileCheckbox}
            onChange={handleChangeMobileCheckbox}
          />
        </div>

        <PhoneInput
          defaultCountry="gb"
          value={mobile}
          onChange={handleChangeMobile}
        />
      </div>
      {/* <div className="h-12 -mb-5 -mt-6">
        
        <div className="flex justify-between items-center">
          <label
            className="text-[10px] pt-1 text-grey-light"
            htmlFor={mobileId}
          >
            Text
          </label>
          <Checkbox
            id={mobileId}
            className="pt-1"
            checked={mobileCheckbox}
            onChange={handleChangeMobileCheckbox}
          />
        </div>
        <Input
          className={`px-0 ${styles.input} placeholder:text-grey`}
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={handleChangeMobile}
          bordered={false}
        />
      </div> */}
      <Divider />
      <>
        <div className="flex justify-between items-center -mt-6">
          <label
            className="text-[10px] pt-1 text-grey-light"
            htmlFor={whatsappId}
          >
            WhatsApp
          </label>
          <Checkbox id={whatsappId} className="pt-1" />
        </div>

        <PhoneInput
          defaultCountry="gb"
          value={whatsapp}
          onChange={handleChangeWhatsapp}
        />
      </>
    </div>
  );
};
export default SendTo;
