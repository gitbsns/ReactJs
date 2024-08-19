import {
  Button,
  Checkbox,
  Collapse,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  message,
  Select,
  Table,
} from "antd";
import expertCircleLogo from "assets/logos/expert-circle.svg";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import TextArea from "antd/es/input/TextArea";
import { RiMore2Fill } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import styles from "./createInvoice.module.css";
import invoiceTypeOptions from "data/invoiceTypeOptions";
import { BiSolidPlusSquare } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import paymentStatusOptions from "data/paymentStatusOptions";
import SendTo from "./components/SendTo/SendTo";
import PaymentTermAddModalContainer from "./PaymentTermModal/PaymentTermModalContainer";
import AddNewBtn from "components/AddNewBtn/AddNewBtn";

const CreateInvoice = ({
  invoiceType,
  handleChangeInvoiceType,
  currency,
  handleChangeCurrency,
  currencyOptions,
  currencyLabelRender,
  languageOptions,
  languageLabelRender,
  language,
  handleChangeLanguage,
  invoiceTypeLabelRender,
  billToLabelRender,
  billTo,
  handleChangeBillTo,
  billToOptions,
  orderNo,
  handleChangeOrderNo,
  handleChangeInvoiceDate,
  handleDueDate,
  billingAddress,
  handleChangeBillingAddress,
  billingAddressLabelRender,
  billingAddressOptions,
  salesPersonLabelRender,
  salesPerson,
  handleChangeSalesPerson,
  paymentTermLabelRender,
  paymentTerm,
  handleChangePaymentTerm,
  billingAddressDropDownChange,
  emailId,
  mobileId,
  whatsappId,
  emailCheckbox,
  handleChangeEmailCheckbox,
  email,
  handleChangeEmail,
  mobileCheckbox,
  handleChangeMobileCheckbox,
  mobile,
  handleChangeMobile,
  whatsapp,
  handleChangeWhatsapp,
  totalAmount,
  handleChangeTotalAmount,
  paymentStatus,
  handleChangePaymentStatus,
  paymentLinkCheckbox,
  handlePaymentLinkCheckbox,
  paymentLinkId,
  paymentMethods,
  handleChangePaymentMethods,
  payByCardId,
  cashId,
  bankTransferId,
  paymentLinkEmailId,
  paymentLinkEmailCheckbox,
  handleChangePaymentLinkEmailCheckbox,
  paymentLinkEmail,
  handleChangePaymentLinkEmail,
  paymentLinkMobileId,
  paymentLinkMobileCheckbox,
  handleChangePaymentLinkMobileCheckbox,
  paymentLinkMobile,
  handleChangePaymentLinkMobile,
  paymentLinkWhatsappId,
  paymentLinkWhatsapp,
  handleChangePaymentLinkWhatsapp,
  invoiceNumberOptions,
  invoiceNumber,
  handleChangeInvoiceNumber,
  paymentTermsOptions,
  columns,
  data,
  paymentStatusLabelRender,
  isPaymentTermDropdown,
  setIsPaymentTermDropdown,
  servicesLoading,
  currenciesLoading,
  languagesLoading,
  paymentTermsLoading,
  billToLoading,
  splitInvoiceLabelRender,
  splitInvoice,
  handleChangeSplitInvoice,
  getPaymentTerms,
  handleCreateInvoice,
  handleCreateProformaInvoice,
  createInvoiceRes,
  handleSplitCurrency,
  isCreateLoading,
  services,
  bookingServices,
}) => {
  return (
    <>
      <div className={`grid grid-cols-12 ${styles.createInvoice}`}>
        <div className={`col-span-2 mt-20 ${styles.leftTop}`}>
          <div className="bg-white px-2 py-1 rounded-lg border custom-border">
            <div className={`h-12 -mb-[25px] ${styles.selectWithLabel}`}>
              <div className="text-[10px] pt-1 text-grey-light">Currency</div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown style={{ marginRight: "-8px" }} />}
                labelRender={currencyLabelRender}
                value={currency}
                onChange={handleChangeCurrency}
                options={currencyOptions}
                bordered={false}
                loading={currenciesLoading}
              />
            </div>
            <Divider />
            <div
              className={`h-12 -mt-[20px] -mb-[25px] ${styles.selectWithLabel}`}
            >
              <div className="text-[10px] pt-1 text-grey-light">Language</div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown style={{ marginRight: "-8px" }} />}
                labelRender={languageLabelRender}
                value={language}
                onChange={handleChangeLanguage}
                options={languageOptions}
                bordered={false}
                loading={languagesLoading}
              />
            </div>
            <Divider />
            <div
              className={`h-12 -mt-[20px] -mb-[25px] ${styles.selectWithLabel}`}
            >
              <div className="text-[10px] pt-1 text-grey-light">
                Sales Person
              </div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown style={{ marginRight: "-8px" }} />}
                labelRender={salesPersonLabelRender}
                value={salesPerson}
                onChange={handleChangeSalesPerson}
                bordered={false}
              />
            </div>
            <Divider />
            <div
              className={`h-12 -mt-[20px] -mb-[25px] ${styles.selectWithLabel}`}
            >
              <div className="text-[10px] pt-1 text-grey-light">
                Payment Term
              </div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown style={{ marginRight: "-8px" }} />}
                labelRender={paymentTermLabelRender}
                value={paymentTerm}
                onChange={handleChangePaymentTerm}
                options={paymentTermsOptions}
                bordered={false}
                open={isPaymentTermDropdown}
                loading={paymentTermsLoading}
                onDropdownVisibleChange={(open) =>
                  setIsPaymentTermDropdown(open)
                }
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <div className="py-2 pt-3 bg-white flex justify-center">
                      <PaymentTermAddModalContainer
                        setIsPaymentTermDropdown={setIsPaymentTermDropdown}
                        getPaymentTerms={getPaymentTerms}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <Divider />
            <div className={`${styles.collapse}`}>
              <Collapse
                className="bg-transparent border-0 p-0 text-sm -mt-3"
                expandIcon={({ isActive }) =>
                  !isActive ? (
                    <FiPlus
                      className="mr-[2px]"
                      style={{ color: "#0051CB", fontSize: "12px" }}
                    />
                  ) : (
                    <FiMinus
                      className="mr-[2px]"
                      style={{ color: "#0051CB", fontSize: "12px" }}
                    />
                  )
                }
                items={[
                  {
                    key: "1",
                    label: (
                      <div className="text-main text-xs">Invoice Notes</div>
                    ),
                    children: (
                      <TextArea
                        className="my-2 placeholder:text-grey"
                        autoSize={{
                          minRows: 4,
                          maxRows: 6,
                        }}
                        placeholder="Enter Invoice Notes"
                        maxLength={6}
                      />
                    ),
                  },
                ]}
              />
            </div>
            <div className={`${styles.collapse}`}>
              <Collapse
                className="bg-transparent border-0 p-0 mt-1"
                expandIcon={() => (
                  <FiPlus
                    className="p-0 mr-[2px]"
                    style={{ color: "#0051CB", fontSize: "12px" }}
                  />
                )}
                items={[
                  {
                    key: "1",
                    label: <div className="text-main text-xs">Attachment</div>,
                    children: <p>Accordion</p>,
                  },
                ]}
              />
            </div>
          </div>
          <div className="text-xs mt-5 mb-3">
            Send a copy of the invoice to:
          </div>
          <SendTo
            emailId={emailId}
            emailCheckbox={emailCheckbox}
            handleChangeEmailCheckbox={handleChangeEmailCheckbox}
            email={email}
            handleChangeEmail={handleChangeEmail}
            mobileId={mobileId}
            mobileCheckbox={mobileCheckbox}
            handleChangeMobileCheckbox={handleChangeMobileCheckbox}
            mobile={mobile}
            handleChangeMobile={handleChangeMobile}
            whatsappId={whatsappId}
            whatsapp={whatsapp}
            handleChangeWhatsapp={handleChangeWhatsapp}
          />
          <div className="text-xs mt-5 mb-3">Select invoice template</div>
          <div className="bg-white rounded-lg p-2 grid grid-cols-3 gap-2 border">
            <div className="bg-grey-lightest h-16 w-13 rounded-lg" />
            <div className="bg-grey-lightest h-16 w-13 rounded-lg" />
            <div className="bg-grey-lightest h-16 w-13 rounded-lg" />
            <div className="bg-grey-lightest h-16 w-13 rounded-lg" />
            <div className="bg-grey-lightest h-16 w-13 rounded-lg" />
          </div>
        </div>
        <div className="col-span-8 w-[78%] mx-auto">
          <div
            className={`bg-white h-12 rounded-lg border relative flex items-center custom-border ${styles.selectWithGroup}`}
          >
            <div className="bg-blue-600 w-11 h-12 absolute right-0 rounded-tr-lg rounded-br-lg" />
            <Select
              className="h-full"
              suffixIcon={<FaAngleDown className="text-white mr-[5px]" />}
              labelRender={invoiceTypeLabelRender}
              defaultValue="1"
              bordered={false}
              style={{
                width: "100%",
              }}
              value={invoiceType}
              onChange={handleChangeInvoiceType}
              options={invoiceTypeOptions}
            />
          </div>
          <div className="bg-white rounded-lg flex justify-between p-2 mt-5 border mb-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-full w-16">
                  <img
                    className="w-full object-cover"
                    src={expertCircleLogo}
                    alt="expert"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base">
                    Expert Digital Services Limited
                  </span>
                  <span className="text-[10px] text-grey-light">
                    Account: 890383
                  </span>
                  <span className="text-[10px] text-grey">
                    usman895@gmail.com
                  </span>
                  <span className="text-[10px] text-grey">+44785687942</span>
                </div>
              </div>
            </div>
            <div className="flex items-start w-36">
              <div className="flex items-start">
                <div>
                  <CiLocationOn className="text-sm text-grey-light" />
                </div>
                <div className="flex flex-col text-[10px] pl-1">
                  <span className="text-grey">
                    4001 Oakwood Blvd Melvindale Michigan, 48122
                  </span>
                </div>
              </div>
              <div>
                <RiMore2Fill className="text-xl text-grey-light" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div
              className={`col-span-1 h-12 bg-white border rounded-lg mb-5 custom-border ${styles.selectWithLabel}`}
            >
              <div className="pl-[11px] text-[10px] pt-1 text-grey-light">
                Bill To
              </div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown className="-mt-4" />}
                labelRender={billToLabelRender}
                value={billTo}
                onChange={handleChangeBillTo}
                options={billToOptions}
                bordered={false}
                // loading={billToLoading}
                // dropdownRender={(menu) => (
                //   <>
                //     {menu}
                //     <div className="py-2 pt-3 bg-white flex justify-center">
                //       <AddNewBtn />
                //     </div>
                //   </>
                // )}
              />
            </div>

            <div className="col-span-1 h-12 bg-white border rounded-lg mb-5 custom-border">
              <div className="pl-[11px] text-[10px] pt-1 text-grey-light">
                Order Number
              </div>
              <Input
                className={`${styles.input} placeholder:text-grey`}
                type="text"
                placeholder="Enter Order No."
                value={orderNo}
                onChange={handleChangeOrderNo}
                bordered={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 -mt-2">
            <div
              className={`col-span-2 h-12 bg-white border rounded-lg mb-5 custom-border ${styles.selectWithLabel}`}
            >
              <div className="pl-[11px] text-[10px] pt-1 text-grey-light">
                Billing Address
              </div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown className="-mt-4" />}
                labelRender={billingAddressLabelRender}
                value={billingAddress}
                onChange={handleChangeBillingAddress}
                // options={billingAddressOptions}
                onDropdownVisibleChange={billingAddressDropDownChange}
                bordered={false}
                // showSearch
                // dropdownRender={(menu) => (
                //   <>
                //     {menu}
                //     <div className="py-2 pt-3 bg-white flex justify-center">
                //       <AddNewBtn />
                //     </div>
                //   </>
                // )}
              />
            </div>

            <div className="col-span-1 h-12 bg-white border rounded-lg mb-5 custom-border">
              <div className="pl-[11px] text-[10px] pt-1 text-grey-light">
                Invoice Date
              </div>
              <DatePicker
                classNames="w-full"
                suffixIcon={
                  <LuCalendarDays className="text-xl -mt-1 text-grey-lightest" />
                }
                placeholder="Select Date"
                onChange={handleChangeInvoiceDate}
                bordered={false}
              />
            </div>
            <div className="col-span-1 h-12 bg-white border rounded-lg mb-5 custom-border">
              <div className="pl-[11px] text-[10px] pt-1 text-grey-light">
                Due Date
              </div>
              <DatePicker
                classNames={`${styles.datePicker} w-full`}
                suffixIcon={
                  <LuCalendarDays className="text-xl -mt-1 text-grey-lightest" />
                }
                placeholder="Select Date"
                onChange={handleDueDate}
                bordered={false}
              />
            </div>
          </div>
          {invoiceType === "Credit Note" ? (
            <div
              className={`min-h-12 bg-white border rounded-lg mb-5 -mt-2 custom-border ${styles.selectWithLabel}`}
            >
              <div className="pl-[11px] text-[10px] pt-1 text-grey">
                Invoice Number
              </div>

              <Select
                className="bg-none border-0 w-full"
                mode="multiple"
                allowClear
                suffixIcon={<FaAngleDown className="-mt-4" />}
                placeholder="Add Sales Invoice"
                value={invoiceNumber.length ? invoiceNumber : undefined}
                onChange={handleChangeInvoiceNumber}
                options={invoiceNumberOptions}
                bordered={false}
              />
            </div>
          ) : (
            ""
          )}
          {invoiceType === "Split Invoice" ? (
            <div
              className={`h-12 bg-white border rounded-lg mb-5 -mt-2 custom-border ${styles.selectWithLabel}`}
            >
              <div className="pl-[11px] text-[10px] pt-1 text-grey">
                Split Number
              </div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown className="-mt-4" />}
                labelRender={splitInvoiceLabelRender}
                value={splitInvoice}
                onChange={handleChangeSplitInvoice}
                // options={invoiceNumberOptions}
                bordered={false}
              />
            </div>
          ) : (
            ""
          )}
          <div className={`${styles.table} pt-3`}>
            <Table
              className={`rounded-lg border ${
                bookingServices?.length || services?.length ? "h-[311px]" : ""
              } relative overflow-auto border-main bg-white`}
              columns={columns}
              dataSource={data}
              pagination={false}
              // tableLayout="fixed"
              loading={servicesLoading}
              // scroll={{ y: 180 }}
              // footer={() => (
              //   <div
              //     className="text-main bg-white text-xs rounded-lg w-full p-[14px] flex items-center"
              //     type="primary"
              //   >
              //     <IoAddCircleOutline className="text-sm" />
              //     <span className="ml-1">Add New Product</span>
              //   </div>
              // )}
            />
          </div>

          <div className="pt-3">
            <div className="bg-white rounded-lg p-2 my-5 border">
              <div className="w-full flex justify-between items-center">
                <span className="text-sm text-grey">Sub Total</span>
                <span className="text-grey text-sm font-medium">
                  {handleSplitCurrency(createInvoiceRes.currency) || ""}
                  {createInvoiceRes.subTotal || "0.00"}
                </span>
              </div>
              <div className="w-full flex justify-between items-center mt-2 -mb-3">
                <span className="text-sm text-grey-light">VAT 0%</span>
                <span className="text-grey-light text-sm">
                  {handleSplitCurrency(createInvoiceRes.currency) || ""}0.00
                </span>
                {/* <span className="text-sm text-grey-light">VAT (20%)</span>
                <span className="text-grey-light text-sm">£16.00</span> */}
              </div>
              <Divider />
              <div className="w-full flex justify-between items-center -mt-3">
                <span className="text-sm font-medium">Total Amount</span>
                <span className="text-sm font-medium">
                  {handleSplitCurrency(createInvoiceRes.currency) || ""}
                  {createInvoiceRes.totalAmount || "0.00"}
                </span>
              </div>
            </div>
          </div>
          <div className="font-medium text-sm pt-3 text-grey mb-3">
            Additional Information
          </div>
          <div className={`${styles.collapse}`}>
            <Collapse
              className="bg-transparent border-0 p-0 text-sm"
              expandIcon={({ isActive }) =>
                !isActive ? (
                  <FiPlus
                    className="mr-[2px]"
                    style={{ color: "#0051CB", fontSize: "12px" }}
                  />
                ) : (
                  <FiMinus
                    className="mr-[2px]"
                    style={{ color: "#0051CB", fontSize: "12px" }}
                  />
                )
              }
              items={[
                {
                  key: "1",
                  label: (
                    <div className="text-main text-xs">
                      Invoice Notes for Customer
                    </div>
                  ),
                  children: (
                    <TextArea
                      className="my-2 placeholder:text-grey"
                      autoSize={{
                        minRows: 4,
                        maxRows: 6,
                      }}
                      placeholder="Enter Invoice Notes"
                      maxLength={6}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className={`${styles.collapse}`}>
            <Collapse
              className="bg-transparent border-0 p-0 mt-1"
              expandIcon={() => (
                <FiPlus
                  className="p-0 mr-[2px]"
                  style={{ color: "#0051CB", fontSize: "12px" }}
                />
              )}
              items={[
                {
                  key: "1",
                  label: (
                    <div className="text-main text-xs">Terms & Conditions</div>
                  ),
                  children: <p>Accordion</p>,
                },
              ]}
            />
          </div>

          <div className="flex justify-end mt-20">
            {/* {invoiceType !== "Proforma Invoice" ? (
              <Button className="btn-secondary">
                Save as Proforma Invoice
              </Button>
            ) : (
              ""
            )} */}
            {/* handleCreateProformaInvoice */}

            <Button
              className="btn-main ml-5"
              disabled={!invoiceType}
              loading={isCreateLoading}
              onClick={() => {
                if (!invoiceType) {
                  message.error("Please select an invoice type to proceed.");
                }
                return invoiceType === "Proforma Invoice"
                  ? handleCreateProformaInvoice()
                  : invoiceType === "Sales Invoice" ||
                    invoiceType === "Credit Note"
                  ? handleCreateInvoice()
                  : "";
              }}
            >
              {invoiceType === "Proforma Invoice"
                ? "Create Proforma invoice"
                : invoiceType === "Sales Invoice"
                ? "Create Sales invoice"
                : invoiceType === "Credit Note"
                ? "Create Sales Invoice"
                : "Create Sales Invoice"}
            </Button>
          </div>
        </div>
        <div className={`col-span-2 mt-20 ${styles.rightTop}`}>
          <div
            className={`bg-white border-[1.5px] ${
              paymentStatus === "Unpaid" ? "border-red-500" : "border-green-500"
            } rounded-lg p-2 pb-5`}
          >
            <div className="h-12 -mb-7">
              <div className="flex justify-between items-center">
                <div className="text-[10px] text-grey-light">Total Amount</div>
              </div>
              <div className={`${styles.totalAmountInput} flex items-center`}>
                <span className="font-medium text-base">
                  {handleSplitCurrency(currency) || ""}
                </span>

                <InputNumber
                  className={`${styles.input} pe-4 text-base font-medium w-full`}
                  placeholder="0"
                  type="number"
                  value={totalAmount}
                  onChange={handleChangeTotalAmount}
                  bordered={false}
                  min={invoiceType === "Credit Note" ? undefined : 0}
                />
              </div>
            </div>
            <Divider />
            <div
              className={`h-12 -mb-6 -mt-5 ${styles.selectWithLabel} ${
                paymentStatus === "Unpaid"
                  ? styles.paymentStatusRed
                  : styles.paymentStatusGreen
              }`}
            >
              <div className="text-[10px] text-grey-light">Payment Status</div>
              <Select
                className="bg-none border-0 w-full"
                suffixIcon={<FaAngleDown style={{ marginRight: "-8px" }} />}
                labelRender={paymentStatusLabelRender}
                value={paymentStatus}
                onChange={handleChangePaymentStatus}
                options={paymentStatusOptions}
                bordered={false}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between -mb-3">
            <label className="text-xs" htmlFor={paymentLinkId}>
              Send payment link
            </label>
            <Checkbox
              id={paymentLinkId}
              checked={paymentLinkCheckbox}
              onChange={handlePaymentLinkCheckbox}
            />
          </div>
          {paymentLinkCheckbox ? (
            <div className="mt-5 pt-1 -mb-2">
              <SendTo
                emailId={paymentLinkEmailId}
                emailCheckbox={paymentLinkEmailCheckbox}
                handleChangeEmailCheckbox={handleChangePaymentLinkEmailCheckbox}
                email={paymentLinkEmail}
                handleChangeEmail={handleChangePaymentLinkEmail}
                mobileId={paymentLinkMobileId}
                mobileCheckbox={paymentLinkMobileCheckbox}
                handleChangeMobileCheckbox={
                  handleChangePaymentLinkMobileCheckbox
                }
                mobile={paymentLinkMobile}
                handleChangeMobile={handleChangePaymentLinkMobile}
                whatsappId={paymentLinkWhatsappId}
                whatsapp={paymentLinkWhatsapp}
                handleChangeWhatsapp={handleChangePaymentLinkWhatsapp}
              />
            </div>
          ) : (
            ""
          )}
          <Divider />
          <div className="-mt-2 mb-3">
            <div className="text-xs">Acceptable payment methods</div>
          </div>
          <div className="bg-white rounded-lg border p-2 pt-1 custom-border">
            <div className="flex items-center justify-between -mb-4">
              <label
                className={`text-sm ${
                  !paymentMethods.payByCard ? "text-grey-light" : "text-black"
                }`}
                htmlFor={payByCardId}
              >
                Pay by card
              </label>
              <Checkbox
                id={payByCardId}
                className="pt-1"
                name="payByCard"
                checked={paymentMethods.payByCard}
                onChange={handleChangePaymentMethods}
              />
            </div>
            <Divider />
            <div className="flex items-center justify-between -mt-5 -mb-4">
              <label
                className={`text-sm ${
                  !paymentMethods.cash ? "text-grey-light" : "text-black"
                }`}
                htmlFor={cashId}
              >
                Cash
              </label>
              <Checkbox
                id={cashId}
                className="pt-1"
                name="cash"
                checked={paymentMethods.cash}
                onChange={handleChangePaymentMethods}
              />
            </div>
            <Divider />
            <div className="flex items-center justify-between -mt-5">
              <label
                className={`text-sm ${
                  !paymentMethods.bankTransfer
                    ? "text-grey-light"
                    : "text-black"
                }`}
                htmlFor={bankTransferId}
              >
                Bank transfer
              </label>
              <Checkbox
                id={bankTransferId}
                className="pt-1"
                name="bankTransfer"
                checked={paymentMethods.bankTransfer}
                onChange={handleChangePaymentMethods}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateInvoice;
