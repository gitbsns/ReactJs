import { useEffect, useId, useState } from "react";
import useFetch from "hooks/useFetch";
import endpoints from "api/endpoints";
import { Avatar, Dropdown, message, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CiMoneyBill, CiSearch } from "react-icons/ci";
import expertCircleLogo from "assets/logos/expert-circle.svg";
import { RiMore2Fill } from "react-icons/ri";
import styles from "./createBilling.module.css";
import { FaAngleDown } from "react-icons/fa6";
import ReactHelmet from "components/ReactHelmet/ReactHelmet";
import { useSelector } from "react-redux";
import api from "api/axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AssignAttributeModal from "./AssignAttributeModal/AssignAttributeModal";
import CreateBilling from "./CreateBilling";
import usePost from "hooks/usePost";

const CreateBillingContainer = () => {
  const [invoiceType, setInvoiceType] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [billTo, setBillTo] = useState("");
  const [attributeVal, setAttributeVal] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [salesPerson, setSalesPerson] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [billingAddressOpen, setBillingAddressOpen] = useState(false);
  const [emailCheckbox, setEmailCheckbox] = useState(false);
  const [paymentLinkEmailCheckbox, setPaymentLinkEmailCheckbox] =
    useState(false);
  const [email, setEmail] = useState("");
  const [paymentLinkEmail, setPaymentLinkEmail] = useState("");
  const [mobileCheckbox, setMobileCheckbox] = useState(false);
  const [paymentLinkMobileCheckbox, setPaymentLinkMobileCheckbox] =
    useState(false);
  const [mobile, setMobile] = useState("");
  const [paymentLinkMobile, setPaymentLinkMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [paymentLinkWhatsapp, setPaymentLinkWhatsapp] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [paymentLinkCheckbox, setPaymentLinkCheckbox] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState({
    payByCard: true,
    cash: false,
    bankTransfer: false,
  });
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [splitInvoice, setSplitInvoice] = useState("");
  const [descriptionSelect, setDescriptionSelect] = useState({});
  const [priceState, setPriceState] = useState({});
  const [quantityState, setQuantityState] = useState({});
  const [amountState, setAmountState] = useState({});
  const [tax, setTax] = useState({});
  const [isPaymentTermDropdown, setIsPaymentTermDropdown] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [createInvoiceRes, setCreateInvoiceRes] = useState({
    currency: "",
    subTotal: "0.00",
    totalAmount: "0.00",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceForAtt, setServiceForAtt] = useState("");
  const [serviceAttributes, setServiceAttributes] = useState([]);
  const [serviceAttributesWhole, setServiceAttributesWhole] = useState([]);
  const [assignedAttributes, setAssignedAttributes] = useState([]);
  const [serviceAttMsg, setServiceAttMsg] = useState("");
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const navigate = useNavigate();

  const {
    businssId: businessId,
    id: userId,
    firstName,
    lastName,
    accountNumber,
    roleName,
    businessName,
    primaryEmail,
    secondaryEmail,
    primaryMobile,
    secondaryMobile,
  } = useSelector((state) => state.auth.user);

  const { postData } = usePost();

  const emailId = useId();
  const mobileId = useId();
  const whatsappId = useId();
  const paymentLinkId = useId();
  const payByCardId = useId();
  const cashId = useId();
  const bankTransferId = useId();
  const paymentLinkEmailId = useId();
  const paymentLinkMobileId = useId();
  const paymentLinkWhatsappId = useId();

  const handleChangeInvoiceType = (value) => setInvoiceType(value);
  const handleChangeCurrency = (value) => setCurrency(value);
  const handleChangeLanguage = (value) => setLanguage(value);
  const handleChangeBillTo = (value) => setBillTo(value);
  const handleChangeAttributeVal = (selectedValues) => {
    if (attributeOptions?.length > 0) {
      setAttributeVal((prev) => ({
        ...prev,
        [serviceForAtt?.props?.id]: selectedValues,
      }));
    }
  };

  const handleChangeOrderNo = (e) => setOrderNo(e.target.value);
  const handleChangeBillNo = (e) => setBillNo(e.target.value);
  const handleChangeBillDate = (date, dateStr) => setBillDate(dateStr);
  const handleDueDate = (date, dateStr) => setDueDate(dateStr);
  const handleChangeBillingAddress = (value) => setBillingAddress(value);
  const handleChangeSalesPerson = (value) => setSalesPerson(value);
  const handleChangePaymentTerm = (value) => setPaymentTerm(value);
  const handleChangeEmailCheckbox = (e) => setEmailCheckbox(e.target.checked);
  const handleChangePaymentLinkEmailCheckbox = (e) =>
    setPaymentLinkEmailCheckbox(e.target.checked);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePaymentLinkEmail = (e) =>
    setPaymentLinkEmail(e.target.value);
  const handleChangeMobileCheckbox = (e) => setMobileCheckbox(e.target.checked);
  const handleChangePaymentLinkMobileCheckbox = (e) =>
    setPaymentLinkMobileCheckbox(e.target.checked);
  // const handleChangeMobile = (e) => {
  //   const { value } = e.target;
  //   const formattedValue = value.replace(/\D/g, "");
  //   setMobile(formattedValue);
  // };

  const handleOk = async () => {
    setIsModalOpen(false);

    const selectedAttributes = serviceAttributesWhole.filter((val) =>
      attributeVal?.[serviceForAtt?.props?.id]?.includes(val.value)
    );

    if (selectedAttributes.length > 0) {
      setAssignedAttributes((prev) => {
        const newAttributes = {
          serviceId: serviceForAtt?.props?.id,
          attributes: selectedAttributes,
        };

        const updatedAttributes = prev.filter(
          (item) => item.serviceId !== serviceForAtt.props.id
        );

        return [...updatedAttributes, newAttributes];
      });
    }

    setServiceForAtt("");
  };

  const handleCancel = () => {
    // setAttributeVal([]);
    setIsModalOpen(false);
    setServiceForAtt("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChangeMobile = (value) => setMobile(value);
  const handleChangePaymentLinkMobile = (value) => setPaymentLinkMobile(value);

  // const handleChangePaymentLinkMobile = (e) => {
  //   const { value } = e.target;
  //   const formattedValue = value.replace(/\D/g, "");
  //   setPaymentLinkMobile(formattedValue);
  // };
  const handleChangeWhatsapp = (value) => setWhatsapp(value);
  const handleChangePaymentLinkWhatsapp = (value) =>
    setPaymentLinkWhatsapp(value);

  const handleChangeTotalAmount = (value) => setTotalAmount(value);
  const handleChangePaymentStatus = (value) => setPaymentStatus(value);
  const handlePaymentLinkCheckbox = (e) =>
    setPaymentLinkCheckbox(e.target.checked);
  const handleChangePaymentMethods = (e) => {
    const { name } = e.target;
    const updatedMethods = {
      payByCard: name === "payByCard",
      cash: name === "cash",
      bankTransfer: name === "bankTransfer",
    };
    setPaymentMethods(updatedMethods);

    setSelectedPaymentMethod(
      Object.keys(updatedMethods).find((key) => updatedMethods[key])
    );
  };

  const handleChangeInvoiceNumber = (value) => setInvoiceNumber(value);
  const handleChangeSplitInvoice = (value) => setSplitInvoice(value);

  const handleChangeTax = (value, serviceId) => {
    setTax((prev) => ({
      ...prev,
      [serviceId]: value,
    }));
  };

  const handleChangeDescriptionSelect = (value, serviceId) => {
    setDescriptionSelect((prev) => ({
      ...prev,
      [serviceId]: value,
    }));
    setPriceState((prev) => ({
      ...prev,
      [serviceId]: services?.find((el) => el.serviceName === value)
        ?.actualPrice,
    }));
    setQuantityState((prev) => ({
      ...prev,
      [serviceId]: services?.find((el) => el.serviceName === value)?.quantity,
    }));
    setAmountState((prev) => ({
      ...prev,
      [serviceId]: services?.find((el) => el.serviceName === value)?.amount,
    }));
    const selectedService = allServicesOptions.find(
      (option) => option.value === value
    );
  };

  const billingAddressDropDownChange = (open) => setBillingAddressOpen(open);

  const {
    data: { currencies },
    isLoading: currenciesLoading,
  } = useFetch(endpoints.getAllCurrencies);

  const {
    data: { languagies },
    isLoading: languagesLoading,
  } = useFetch(endpoints.getAllLanguages);

  const {
    data: { customerBusiness },
    isLoading: billToLoading,
  } = useFetch(endpoints.getAllCustomerBusiness);

  const {
    data: { services },
    isLoading: servicesLoading,
  } = useFetch(endpoints.getAllServicesByBusinessId, {
    businessId: 2,
  });

  console.log("%$", assignedAttributes);

  const handleGetServiceAttributes = async () => {
    try {
      const res = await api.get(endpoints.getServiceAttributesByServiceId, {
        params: {
          countryid: 188,
          id: serviceForAtt?.props?.id,
          // id: services?.find(
          //   (el) => el.serviceName === descriptionSelect[serviceForAtt?.key]
          // )?.serviceId,
        },
      });

      setServiceAttMsg(res.data.message);
      if (res.data.code === 0) {
        setServiceAttributesWhole(
          res.data.result.serviceAttribute
            .map((el) =>
              el.values.map((it) => ({
                id: it.id,
                attributeSku: it.sku,
                duration: it.duration,
                serviceId: el.serviceId,
                serviceSKU: el.serviceSku,
                value: it.value,
                attributeDetail: el.attributeType,
                attributePrice: it.attributePrice,
                isChecked: true,
              }))
            )
            .flat()
        );

        setServiceAttributes(
          res.data.result.serviceAttribute?.flatMap((el) =>
            el.values.map((it) => it.value)
          )
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    // if (serviceForAtt?.key) {
    if (serviceForAtt?.props?.id) {
      handleGetServiceAttributes();
    }
  }, [serviceForAtt]);

  console.log("1 data", serviceAttributesWhole);

  const { data: invoiceNumbers } = useFetch(endpoints.bills, {
    bill_type: "debit Note",
  });

  const {
    data: paymentTerms,
    isLoading: paymentTermsLoading,
    fetchData: getPaymentTerms,
  } = useFetch(endpoints.billPaymentTerms, {
    businessId,
  });

  const { data: taxes } = useFetch(endpoints.billTaxes, {
    business_id: businessId,
  });

  const currencyOptions = Array.from(
    new Set(currencies?.map((el) => `${el.currencyName} (${el.symbol})`))
  )?.map((value) => ({
    label: value,
    value: value,
  }));

  const invoiceTypeLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Billing</span>;

  const currencyLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Currency</span>;

  const languageLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Language</span>;

  const billToLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Vender</span>;

  const billingAddressLabelRender = ({ label, value }) =>
    label ? (
      value
    ) : (
      <div className="text-grey flex">
        <span>
          {billingAddressOpen ? <CiSearch className="text-lg mt-[6px]" /> : ""}
        </span>
        <span className={billingAddressOpen ? "pl-1" : ""}>
          Select Vender’s Billing Address
        </span>
      </div>
    );

  const serviceLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Service</span>;

  const salesPersonLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Sales Person</span>;

  const paymentTermLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Payment Term</span>;

  const splitInvoiceLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Add Split Number</span>;

  const taxLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Tax</span>;

  const paymentStatusLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Status</span>;

  const languageOptions = Array.from(
    new Set(languagies?.map((el) => el.languageName))
  )?.map((languageName) => ({
    label: languageName,
    value: languageName,
  }));

  const billToOptions = Array.from(
    new Set(
      customerBusiness?.map(
        (el) => `${el.customerFirstName} ${el.customerLastName}`
      )
    )
  )?.map((value) => ({
    label: (
      <div className="flex items-center">
        <div>
          <Avatar className="mr-[6px]" icon={<UserOutlined />} size="small" />
        </div>
        {value}
      </div>
    ),
    value,
  }));

  const attributeOptions =
    serviceAttMsg === "succeeded"
      ? serviceAttributes?.map((el) => ({
          label: el,
          value: el,
        }))
      : { label: "", value: "" };

  const allServicesOptions = services?.map((el) => ({
    label: (
      <div className="flex items-center">
        <div>
          <div className={`${el.isExpert ? "relative" : ""}`}>
            <Avatar
              className="mr-[6px]"
              src={!el.serviceImage ? el.serviceImage : ""}
              icon={<UserOutlined />}
              size="small"
            />
            {el.isExpert ? (
              <div className="w-3 h-3 absolute left-[14px] top-2 z-10">
                <Avatar className="w-full h-full" src={expertCircleLogo} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <span>{el.serviceName}</span>
          <span className="text-[10px] ml-1 mr-3 text-grey">
            ({el.duration} mins)
          </span>
          <span className="font-medium">
            {el.currency}
            {el.actualPrice}
          </span>
        </div>
      </div>
    ),
    value: el.serviceName,
  }));

  const billingAddressOptions = [
    {
      label: (
        <>
          <span>Clinic,</span>&nbsp;
          <span className="text-grey text-xs">973, Broaddus Avenue, Kings</span>
        </>
      ),
      value: "Clinic, 973, Broaddus Avenue, Kings",
    },
    {
      label: (
        <>
          <span>Office,</span>&nbsp;
          <span className="text-grey text-xs">11 Manor Way, CM1 3ZQ</span>
        </>
      ),
      value: "Office, 11 Manor Way, CM1 3ZQ",
    },
    {
      label: (
        <>
          <span>Home,</span>&nbsp;
          <span className="text-grey text-xs">Hampton Lovett, WR9 2PF</span>
        </>
      ),
      value: "Home, Hampton Lovett, WR9 2PF",
    },
  ];

  const invoiceNumberOptions = invoiceNumbers?.map((el) => ({
    label: (
      <div className="flex items-center">
        <>
          <CiMoneyBill className="text-lg" />
        </>
        <span className="ml-2">{el.bill_id}</span>
      </div>
    ),
    value: el.bill_id,
  }));

  const paymentTermsOptions = Array.from(
    new Set(paymentTerms?.map((el) => el.name))
  )?.map((name) => ({
    value: name,
    label: name,
  }));

  const uniqueTaxes = Array.from(
    new Set(
      taxes?.map((el) => {
        const value = el.value % 1 === 0 ? parseInt(el.value) : el.value;
        return `${value}% ${el.name}`;
      })
    )
  );

  const taxesOptions = uniqueTaxes?.map((formattedValue) => {
    return {
      value: formattedValue,
      label: formattedValue,
    };
  });

  useEffect(() => {
    setDescriptionSelect(
      services
        ? services.reduce((acc, el) => {
            acc[el.serviceId] = el.serviceName;
            return acc;
          }, {})
        : {}
    );
    setTax(
      services
        ? services.reduce((acc, el) => {
            acc[el.serviceId] = `${
              el.tax_percent % 1 === 0
                ? parseInt(el.tax_percent)
                : el.tax_percent
            } ${el.taxType}`;
            return acc;
          }, {})
        : {}
    );
  }, [services]);

  console.log("@", serviceForAtt);

  const getMenuItems = (arg) => [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            console.log("!!!", {
              desc: descriptionSelect,
              arg: arg.description,
            });
            setServiceForAtt(arg.description);
            showModal();
          }}
        >
          Assign Attribute
        </div>
      ),
    },
  ];

  console.log("s %", serviceForAtt);

  useEffect(() => {
    if (services) {
      setAttributeVal((prev) => {
        const newState = { ...prev };
        services.forEach((el) => {
          newState[el.serviceId] = "";
        });
        return newState;
      });
    }
  }, [services]);

  const columns = [
    {
      title: "",
      dataIndex: "more",
      render: (_, record) => (
        <div
          className="translate-y-[5px]"
          style={{
            padding: "2px",
            borderRight: "1px solid #e8e8e8",
          }}
        >
          <Dropdown
            menu={{
              items: getMenuItems(record),
            }}
            placement="bottomLeft"
            arrow
            trigger={["click"]}
          >
            <RiMore2Fill className="text-grey -ml-[7px] cursor-pointer" />
          </Dropdown>
        </div>
      ),
      width: 35,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <div
          style={{
            padding: "2px",
            // borderRight: "1px solid #e8e8e8",
            // height: "28px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => (
        <div
          style={{
            padding: "2px",
            borderRight: "1px solid #e8e8e8",
            height: "28px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => (
        <div
          style={{
            padding: "2px",
            borderRight: "1px solid #e8e8e8",
            height: "28px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Tax",
      dataIndex: "tax",
      render: (text) => (
        <div
          style={{
            padding: "2px",
            borderRight: "1px solid #e8e8e8",
            height: "28px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => text,
    },
  ];

  console.log("descriptionSelect", serviceForAtt);

  const data = services?.map((el, i) => ({
    key: i,
    description: (
      <div className="w-60 truncate" id={el.serviceId}>
        <div className="border-r border-gray-200 h-[26px]">
          {el.serviceName}
        </div>
        {assignedAttributes?.length
          ? assignedAttributes
              .filter((it) => it.serviceId === el.serviceId)
              .flatMap((att) => att.attributes)
              .map((att) => (
                <ul key={att.id}>
                  <li className="text-grey-light text-xs">{att.value}</li>
                </ul>
              ))
          : ""}
      </div>
      // <div
      //   key={el.serviceId}
      //   name={el.serviceName}
      //   className={`h-12 -mb-6 w-60 ${styles.selectWithLabel}`}
      // >
      //   <Select
      //     className="bg-none border-0 w-full"
      //     suffixIcon={<FaAngleDown className="-mr-[8px] -mt-[3px]" />}
      //     labelRender={serviceLabelRender}
      //     value={descriptionSelect?.[el.serviceId]}
      //     onChange={(value) =>
      //       handleChangeDescriptionSelect(value, el.serviceId, el.duration)
      //     }
      //     options={allServicesOptions}
      //     bordered={false}
      //     dropdownRender={(menu) => (
      //       <>
      //         <div className="overflow-auto flex">{menu}</div>
      //         <div className="py-2 pt-3 bg-white flex justify-center">
      //           <AddNewBtn />
      //         </div>
      //       </>
      //     )}
      //   />
      // </div>
    ),

    price: (
      <div className="w-16 truncate">
        {!Object.keys(priceState)?.length
          ? el.actualPrice || 0
          : priceState?.[el.serviceId] === null
          ? 0
          : priceState?.[el.serviceId] || el.actualPrice || 0}
      </div>
    ),
    quantity: (
      <div className="w-16 truncate">
        {!Object.keys(quantityState)?.length
          ? el.quantity || 0
          : quantityState?.[el.serviceId] === null
          ? 0
          : quantityState?.[el.serviceId] || el.quantity || 0}
      </div>
    ),

    tax: (
      <div
        key={`tax-${el.serviceId}`}
        className={`h-12 -mb-6 w-[100px] ${styles.selectWithLabel}`}
      >
        <Select
          className="bg-none border-0 w-full"
          suffixIcon={
            <FaAngleDown style={{ marginRight: "-8px", marginTop: "-3px" }} />
          }
          labelRender={taxLabelRender}
          value={tax[el.serviceId] || ""}
          onChange={(value) => handleChangeTax(value, el.serviceId)}
          options={taxesOptions}
          bordered={false}
        />
      </div>
    ),

    amount: (
      <div className="w-16 truncate">
        {!Object.keys(amountState)?.length
          ? el.amount || 0
          : amountState?.[el.serviceId] === null
          ? 0
          : amountState?.[el.serviceId] || el.amount || 0}
      </div>
    ),
  }));

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const today = moment().startOf("day");

  const handleSplitCurrency = (arg) =>
    arg?.split(" ")?.at(-1)?.split("")?.at(1);

  const serviceTaxFromTable = Object.entries(tax).map(([key, val]) => ({
    [key]: val === "undefined undefined" ? "" : val,
  }));
  console.log("allServicesOptions", allServicesOptions);

  // console.log("att val", {
  //   serviceId: Number.isNaN(+serviceForAtt.key) ? "" : +serviceForAtt.key,
  //   attributes: attributeVal,
  // });
  // console.log(
  //   "att val",
  //   serviceAttributesWhole.filter((val) => attributeVal.includes(val.value))
  // );
  // console.log("att val1", attributeVal);

  const payload = services
    ?.map((el) => {
      const taxEntry = serviceTaxFromTable.find((entry) => entry[el.serviceId]);

      return {
        serviceId: el.serviceId,
        serviceSKU: el.serviceSKU,
        serviceName: el.serviceName,
        serviceType: "",
        serviceDetail: "",
        bookingDuration: el.duration,
        isSessionBasedBooking: true,
        serviceImage: el.serviceImage,
        quantity: 0,
        price: el.actualPrice || 0,
        tax_percent: taxEntry
          ? taxEntry[el.serviceId].split(" ").at(0).replace("%", "")
          : "",
      };
    })
    .filter((service) =>
      assignedAttributes
        ?.flatMap((el) => el.attributes)
        .some((attribute) => attribute.serviceId === service.serviceId)
    );

  console.log("payload", serviceAttributesWhole);

  const handleCreateBilling = async () => {
    if (
      !currency ||
      !language ||
      !paymentTerm ||
      !email ||
      !mobile ||
      !whatsapp ||
      !invoiceType ||
      !billTo ||
      !orderNo ||
      !billDate ||
      !dueDate ||
      !totalAmount
    ) {
      return message.error("All fields are required.", 2);
    }
    if (!currency) {
      return message.error("Currency is required.", 2);
    }
    if (!language) {
      return message.error("Language is required.", 2);
    }
    if (!paymentTerm) {
      return message.error("Payment term is required.", 2);
    }
    if (!email) {
      return message.error("Email is required.", 2);
    }
    if (!mobile) {
      return message.error("Mobile is required.", 2);
    }
    if (!whatsapp) {
      return message.error("WhatsApp is required.", 2);
    }
    if (!invoiceType) {
      return message.error("Bill type is required.", 2);
    }
    if (!billTo) {
      return message.error("Bill to is required.", 2);
    }
    if (!billNo) {
      return message.error("Bill number is required.", 2);
    }
    if (!billDate) {
      return message.error("Bill date is required.", 2);
    }
    if (!orderNo) {
      return message.error("Order number is required.", 2);
    }
    if (!dueDate) {
      return message.error("Due date is required.", 2);
    }
    if (invoiceType === "Debit Note" && !invoiceNumber.length) {
      return message.error("Bill number is required.", 2);
    }
    if (!totalAmount) {
      return message.error("Total amount is required.", 2);
    }
    if (paymentLinkCheckbox) {
      if (!paymentLinkEmail && !paymentLinkMobile && !paymentLinkWhatsapp) {
        return message.error(
          "All fields are required in send payment link.",
          2
        );
      }
      if (!emailPattern.test(paymentLinkEmail)) {
        return message.error("Email is required in send payment link.", 2);
      }
      if (!paymentLinkMobile) {
        return message.error("Mobile is required in send payment link.", 2);
      }
      if (!paymentLinkWhatsapp) {
        return message.error("WhatsApp is required in send payment link.", 2);
      }
    }
    if (!emailPattern.test(email)) {
      return message.error("Invalid email format.", 2);
    }
    if (moment(billDate).isBefore(today)) {
      return message.error("Invoice date cannot be before today.", 2);
    }
    if (moment(dueDate).isBefore(moment(billDate))) {
      return message.error("Due date cannot be before invoice date.", 2);
    }

    const payload = {
      subject: invoiceType,
      send_payment_link_to: {
        email: paymentLinkEmail,
        phone: paymentLinkMobile,
        whatsapp: paymentLinkWhatsapp,
      },
      billOwner: `${firstName} ${lastName}`,
      billType: invoiceType,
      countryId: 188,
      plexaarvendorId: accountNumber,
      serviceId: 0,
      bill_to: billTo,
      order_number: orderNo,
      billing_address: "123 Main St, City, Country",
      bill_date: billDate,
      due_date: dueDate,
      language: language,
      sales_person: "Jane Smith",
      payment_term: paymentTerm,
      bill_template_id: 12,
      copy_to_email: email,
      copy_to_mobile_number: mobile,
      copy_to_whatsapp: whatsapp,
      serviceSKU: "SKU123",
      serviceType: "Consulting",
      paymentType:
        selectedPaymentMethod === "payByCard"
          ? "pay by card"
          : selectedPaymentMethod === "bankTransfer"
          ? "bank transfer"
          : "cash",
      vendorFirstName: firstName,
      vendorLastName: lastName,
      vendorEmail: primaryEmail || secondaryEmail,
      vendorNumber: primaryMobile || secondaryMobile,
      providerId: "456789",
      providerName: "XYZ Corporation",
      providerEmail: "provider@example.com",
      businessName: businessName,
      businessId: businessId,
      purchaseOrderId: "456789012",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "Anystate",
        zip: "12345",
      },
      products: services?.map((el) => {
        const taxEntry = serviceTaxFromTable.find(
          (entry) => entry[el.serviceId]
        );

        return {
          serviceId: el.serviceId,
          serviceSKU: el.serviceSKU,
          serviceName: el.serviceName,
          serviceType: "",
          serviceDetail: "",
          bookingDuration: el.duration,
          isSessionBasedBooking: true,
          serviceImage: el.serviceImage,
          quantity: 0,
          price: el.actualPrice || 0,
          tax_percent: taxEntry
            ? taxEntry[el.serviceId].split(" ").at(0).replace("%", "")
            : 0,
          attributes:
            assignedAttributes
              ?.filter((it) => it.serviceId === el.serviceId)
              ?.at(0)
              ?.attributes?.map(({ id, ...rest }) => rest) || [],
        };
      }),
      status: "Pending",
      taxType: "VAT",
      currency: currency,
      totalAmount: totalAmount,
      termsAndCondition: "Payment due within 30 days.",
      description: "Consulting services provided for project management.",
      paymentDate: "2024-03-11T07:23:52.507Z",
      paymentMethodId: "123456789",
      cartId: "987654321",
      payment_status:
        paymentStatus === "Unpaid"
          ? "unpaid"
          : paymentStatus === "paid"
          ? "paid"
          : "",
      balance: 0.0,
      discountType: "Percentage",
      discountPercentage: 5,
      totalDiscount: 25.0,
      walletPayment: true,
      createdBy: userId,
      modifiedBy: userId,
      referencebill: 142,
    };

    const { isSuccess, isLoading, data } = await postData(
      endpoints.createBill,
      payload
    );
    if (isSuccess) {
      setIsCreateLoading(isLoading);
      setCreateInvoiceRes({
        currency: data?.currency,
        subTotal: data?.subTotal,
        totalAmount: data?.totalAmount,
      });
      navigate("/billing");
    }
  };

  const handleCreateDebitNote = async () => {
    if (
      !currency ||
      !language ||
      !paymentTerm ||
      !email ||
      !mobile ||
      !whatsapp ||
      !invoiceType ||
      !billTo ||
      !orderNo ||
      !billDate ||
      !dueDate ||
      !totalAmount
    ) {
      message.error("All fields are required.", 2);
      return;
    }

    const validations = [
      { condition: !currency, message: "Currency is required." },
      { condition: !language, message: "Language is required." },
      { condition: !paymentTerm, message: "Payment term is required." },
      { condition: !email, message: "Email is required." },
      { condition: !mobile, message: "Mobile is required." },
      { condition: !whatsapp, message: "WhatsApp is required." },
      { condition: !invoiceType, message: "Invoice type is required." },
      { condition: !billTo, message: "Bill to is required." },
      { condition: !billNo, message: "Bill number is required." },
      { condition: !billDate, message: "Bill date is required." },
      { condition: !orderNo, message: "Order number is required." },
      { condition: !dueDate, message: "Due date is required." },
      {
        condition: invoiceType === "Debit Note" && !invoiceNumber.length,
        message: "Bill number is required for Debit Note.",
      },
      { condition: !totalAmount, message: "Total amount is required." },
      {
        condition: !emailPattern.test(email),
        message: "Invalid email format.",
      },
      {
        condition: moment(billDate).isBefore(today),
        message: "Invoice date cannot be before today.",
      },
      {
        condition: moment(dueDate).isBefore(moment(billDate)),
        message: "Due date cannot be before invoice date.",
      },
    ];

    for (const { condition, message } of validations) {
      if (condition) {
        message.error(message, 2);
        return;
      }
    }

    if (paymentLinkCheckbox) {
      const paymentLinkValidations = [
        {
          condition:
            !paymentLinkEmail && !paymentLinkMobile && !paymentLinkWhatsapp,
          message: "All fields are required in send payment link.",
        },
        {
          condition: !emailPattern.test(paymentLinkEmail),
          message: "Email is required in send payment link.",
        },
        {
          condition: !paymentLinkMobile,
          message: "Mobile is required in send payment link.",
        },
        {
          condition: !paymentLinkWhatsapp,
          message: "WhatsApp is required in send payment link.",
        },
      ];

      for (const { condition, message } of paymentLinkValidations) {
        if (condition) {
          message.error(message, 2);
          return;
        }
      }
    }

    const payload = {
      original_bill: invoiceType === "debit Note" ? invoiceNumber : [],
      subject: invoiceType,
      billOwner: `${firstName} ${lastName}`,
      billType: invoiceType,
      countryId: 188,
      plexaarvendorId: accountNumber,
      serviceId: 0,
      bill_to: billTo,
      order_number: orderNo,
      billing_address: "123 Main St, City, Country",
      bill_date: billDate,
      due_date: dueDate,
      language: language,
      sales_person: "Jane Smith",
      payment_term: paymentTerm,
      bill_template_id: 12,
      serviceSKU: "SKU123",
      serviceType: "Consulting",
      paymentType:
        selectedPaymentMethod === "payByCard"
          ? "pay by card"
          : selectedPaymentMethod === "bankTransfer"
          ? "bank transfer"
          : "cash",
      vendorFirstName: firstName,
      vendorLastName: lastName,
      vendorEmail: primaryEmail || secondaryEmail,
      vendorNumber: primaryMobile || secondaryMobile,
      providerId: "456789",
      providerName: "XYZ Corporation",
      providerEmail: "provider@example.com",
      businessName: businessName,
      businessId: businessId,
      purchaseOrderId: "456789012",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "Anystate",
        zip: "12345",
      },
      send_payment_link_to: {
        email: paymentLinkEmail,
        phone: paymentLinkMobile,
        whatsapp: paymentLinkWhatsapp,
      },
      copy_to_email: email,
      copy_to_mobile_number: mobile,
      copy_to_whatsapp: whatsapp,
      products: services?.map((el) => {
        const taxEntry = serviceTaxFromTable.find(
          (entry) => entry[el.serviceId]
        );

        return {
          serviceId: el.serviceId,
          serviceSKU: el.serviceSKU,
          serviceName: el.serviceName,
          serviceType: "",
          serviceDetail: "",
          bookingDuration: el.duration,
          isSessionBasedBooking: true,
          serviceImage: el.serviceImage,
          quantity: 0,
          price: el.actualPrice || 0,
          tax_percent: taxEntry
            ? taxEntry[el.serviceId].split(" ").at(0).replace("%", "")
            : 0,
          attributes:
            assignedAttributes
              ?.filter((it) => it.serviceId === el.serviceId)
              ?.at(0)
              ?.attributes?.map(({ id, ...rest }) => rest) || [],
        };
      }),
      status: "Pending",
      taxType: "VAT",
      currency: currency,
      totalAmount: totalAmount,
      termsAndCondition: "Payment due within 30 days.",
      description: "Consulting services provided for project management.",
      paymentDate: "2024-03-11T07:23:52.507Z",
      paymentMethodId: "123456789",
      cartId: "987654321",
      payment_status:
        paymentStatus === "Unpaid"
          ? "unpaid"
          : paymentStatus === "paid"
          ? "paid"
          : "",
      balance: 0.0,
      discountType: "Percentage",
      discountPercentage: 5,
      totalDiscount: 25.0,
      walletPayment: true,
      createdBy: userId,
      modifiedBy: userId,
    };

    const { isSuccess, isLoading, data } = await postData(
      endpoints.debitNotes,
      payload
    );
    if (isSuccess) {
      setIsCreateLoading(isLoading);
      setCreateInvoiceRes({
        currency: data?.currency,
        subTotal: data?.subTotal,
        totalAmount: data?.totalAmount,
      });
      navigate("/billing");
    }
  };

  return (
    <>
      <ReactHelmet title="Create Billing" />
      <AssignAttributeModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        attributeOptions={attributeOptions}
        attributeVal={attributeVal}
        handleChangeAttributeVal={handleChangeAttributeVal}
        serviceForAtt={serviceForAtt}
        descriptionSelect={descriptionSelect}
      />
      <CreateBilling
        invoiceType={invoiceType}
        handleChangeInvoiceType={handleChangeInvoiceType}
        currencies={currencies}
        currency={currency}
        handleChangeCurrency={handleChangeCurrency}
        currencyOptions={currencyOptions}
        currencyLabelRender={currencyLabelRender}
        languageOptions={languageOptions}
        languageLabelRender={languageLabelRender}
        language={language}
        handleChangeLanguage={handleChangeLanguage}
        invoiceTypeLabelRender={invoiceTypeLabelRender}
        billToLabelRender={billToLabelRender}
        billTo={billTo}
        handleChangeBillTo={handleChangeBillTo}
        billToOptions={billToOptions}
        orderNo={orderNo}
        handleChangeOrderNo={handleChangeOrderNo}
        billNo={billNo}
        handleChangeBillNo={handleChangeBillNo}
        handleChangeBillDate={handleChangeBillDate}
        handleDueDate={handleDueDate}
        allServicesOptions={allServicesOptions}
        services={services}
        serviceLabelRender={serviceLabelRender}
        billingAddress={billingAddress}
        handleChangeBillingAddress={handleChangeBillingAddress}
        billingAddressLabelRender={billingAddressLabelRender}
        billingAddressOptions={billingAddressOptions}
        salesPersonLabelRender={salesPersonLabelRender}
        salesPerson={salesPerson}
        handleChangeSalesPerson={handleChangeSalesPerson}
        paymentTermLabelRender={paymentTermLabelRender}
        paymentTerm={paymentTerm}
        handleChangePaymentTerm={handleChangePaymentTerm}
        billingAddressDropDownChange={billingAddressDropDownChange}
        emailId={emailId}
        mobileId={mobileId}
        whatsappId={whatsappId}
        emailCheckbox={emailCheckbox}
        handleChangeEmailCheckbox={handleChangeEmailCheckbox}
        email={email}
        handleChangeEmail={handleChangeEmail}
        mobileCheckbox={mobileCheckbox}
        handleChangeMobileCheckbox={handleChangeMobileCheckbox}
        mobile={mobile}
        handleChangeMobile={handleChangeMobile}
        whatsapp={whatsapp}
        handleChangeWhatsapp={handleChangeWhatsapp}
        totalAmount={totalAmount}
        handleChangeTotalAmount={handleChangeTotalAmount}
        paymentStatus={paymentStatus}
        handleChangePaymentStatus={handleChangePaymentStatus}
        paymentLinkCheckbox={paymentLinkCheckbox}
        handlePaymentLinkCheckbox={handlePaymentLinkCheckbox}
        paymentLinkId={paymentLinkId}
        paymentMethods={paymentMethods}
        handleChangePaymentMethods={handleChangePaymentMethods}
        payByCardId={payByCardId}
        cashId={cashId}
        bankTransferId={bankTransferId}
        paymentLinkEmailId={paymentLinkEmailId}
        paymentLinkEmailCheckbox={paymentLinkEmailCheckbox}
        handleChangePaymentLinkEmailCheckbox={
          handleChangePaymentLinkEmailCheckbox
        }
        paymentLinkEmail={paymentLinkEmail}
        handleChangePaymentLinkEmail={handleChangePaymentLinkEmail}
        paymentLinkMobileId={paymentLinkMobileId}
        paymentLinkMobileCheckbox={paymentLinkMobileCheckbox}
        handleChangePaymentLinkMobileCheckbox={
          handleChangePaymentLinkMobileCheckbox
        }
        paymentLinkMobile={paymentLinkMobile}
        handleChangePaymentLinkMobile={handleChangePaymentLinkMobile}
        paymentLinkWhatsappId={paymentLinkWhatsappId}
        paymentLinkWhatsapp={paymentLinkWhatsapp}
        handleChangePaymentLinkWhatsapp={handleChangePaymentLinkWhatsapp}
        invoiceNumberOptions={invoiceNumberOptions}
        invoiceNumber={invoiceNumber}
        handleChangeInvoiceNumber={handleChangeInvoiceNumber}
        paymentTermsOptions={paymentTermsOptions}
        taxes={taxes}
        columns={columns}
        data={data}
        paymentStatusLabelRender={paymentStatusLabelRender}
        isPaymentTermDropdown={isPaymentTermDropdown}
        setIsPaymentTermDropdown={setIsPaymentTermDropdown}
        servicesLoading={servicesLoading}
        currenciesLoading={currenciesLoading}
        languagesLoading={languagesLoading}
        paymentTermsLoading={paymentTermsLoading}
        billToLoading={billToLoading}
        splitInvoiceLabelRender={splitInvoiceLabelRender}
        splitInvoice={splitInvoice}
        handleChangeSplitInvoice={handleChangeSplitInvoice}
        getPaymentTerms={getPaymentTerms}
        handleCreateBilling={handleCreateBilling}
        createInvoiceRes={createInvoiceRes}
        handleSplitCurrency={handleSplitCurrency}
        handleCreateDebitNote={handleCreateDebitNote}
        isCreateLoading={isCreateLoading}
      />
    </>
  );
};
export default CreateBillingContainer;
