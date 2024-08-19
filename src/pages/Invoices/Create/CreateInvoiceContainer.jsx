import { useEffect, useId, useState } from "react";
import useFetch from "hooks/useFetch";
import endpoints from "api/endpoints";
import { Avatar, Dropdown, message, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CiSearch } from "react-icons/ci";
import expertCircleLogo from "assets/logos/expert-circle.svg";
import { RiMore2Fill } from "react-icons/ri";
import styles from "./createInvoice.module.css";
import { FaAngleDown } from "react-icons/fa6";
import AddNewBtn from "components/AddNewBtn/AddNewBtn";
import { TbFileInvoice } from "react-icons/tb";
import ReactHelmet from "components/ReactHelmet/ReactHelmet";
import CreateInvoice from "./CreateInvoice";
import { useSelector } from "react-redux";
import api from "api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import AssignAttributeModal from "./AssignAttributeModal/AssignAttributeModal";
import usePost from "hooks/usePost";
import env from "config/env";
import { setUser } from "slices/authSlice";
import { decrypt } from "utils/crypto";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAppointment } from "slices/appointmentSlice";

const CreateInvoiceContainer = () => {
  const [bookingData, setBookingData] = useState({});
  const [invoiceType, setInvoiceType] = useState("");
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [billTo, setBillTo] = useState("");
  const [attributeVal, setAttributeVal] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState();
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
  const [services, setServices] = useState([]);
  const [isServicesLoading, setIsServicesLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

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

  const {
    appointmentId,
    plexaarBookingId,
    appointmentUserId,
    appointmentBusinessId,
    encryptedURL,
  } = useSelector((state) => state.appointment.appointment);

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
  const handleChangeInvoiceDate = (date, dateStr) => setInvoiceDate(dateStr);
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
        console.log("selectedAttributes", selectedAttributes);

        const updatedAttributes = prev.filter(
          (item) => item.serviceId !== serviceForAtt.props.id
        );

        return [...updatedAttributes, newAttributes];
      });
    }

    setServiceForAtt("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setServiceForAtt("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleChangeMobile = (value) => setMobile(value);
  const handleChangePaymentLinkMobile = (value) => setPaymentLinkMobile(value);

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

  const handleGetServices = async () => {
    setIsServicesLoading(true);
    try {
      const res = await api.get(endpoints.getAllServicesByBusinessId, {
        params: {
          businessId: 2,
        },
      });
      const { code, result } = res.data;
      if (code === 0) {
        setServices(result?.services);
      }
    } catch (error) {
    } finally {
      setIsServicesLoading(false);
    }
  };

  useEffect(() => {
    if (!plexaarBookingId) {
      handleGetServices();
    }
  }, []);

  console.log("%$", assignedAttributes);

  const handleGetServiceAttributes = async () => {
    try {
      const res = await api.get(endpoints.getServiceAttributesByServiceId, {
        params: {
          countryid: 188,
          id: serviceForAtt?.props?.id,
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

  console.log("serviceattri", serviceAttributes);

  useEffect(() => {
    if (serviceForAtt?.props?.id && !plexaarBookingId) {
      handleGetServiceAttributes();
    }
  }, [serviceForAtt]);

  console.log("1 data", serviceAttributesWhole);

  const { data: invoiceNumbers } = useFetch(endpoints.invoices);

  const {
    data: paymentTerms,
    isLoading: paymentTermsLoading,
    fetchData: getPaymentTerms,
  } = useFetch(endpoints.paymentTerms, {
    businessId,
  });

  const { data: taxes } = useFetch(endpoints.taxes, {
    business_id: businessId,
  });

  const currencyOptions = Array.from(
    new Set(currencies?.map((el) => `${el.currencyName} (${el.symbol})`))
  )?.map((value) => ({
    label: value,
    value: value,
  }));

  console.log("cuo", currencyOptions);

  const invoiceTypeLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Invoice</span>;

  const currencyLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Currency</span>;

  const languageLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Language</span>;

  const billToLabelRender = ({ label, value }) =>
    label ? value : <span className="text-grey">Select Customer</span>;

  const billingAddressLabelRender = ({ label, value }) =>
    label ? (
      value
    ) : (
      <div className="text-grey flex">
        <span>
          {billingAddressOpen ? <CiSearch className="text-lg mt-[6px]" /> : ""}
        </span>
        <span className={billingAddressOpen ? "pl-1" : ""}>
          Select Customer’s Billing Address
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
          <TbFileInvoice className="text-lg" />
        </>
        <span className="ml-2">{el.invoice_id}</span>
      </div>
    ),
    value: el.invoice_id,
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

  const getMenuItems = (arg) => [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setServiceForAtt(arg.description);
            showModal();
          }}
        >
          Assign Attribute
        </div>
      ),
    },
  ];

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
      render: (_, record) =>
        !plexaarBookingId ? (
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
              disabled={plexaarBookingId}
            >
              <RiMore2Fill
                className={`text-grey -ml-[7px] ${
                  !plexaarBookingId && "cursor-pointer"
                }`}
              />
            </Dropdown>
          </div>
        ) : (
          <></>
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

  const bookingServices = bookingData?.services_link?.map((el) => ({
    serviceId: el.serviceId,
    serviceSKU: el.serviceSKU,
    serviceName: el.serviceName,
    serviceType: el.serviceType,
    serviceDetail: el.serviceDetail,
    duration: el.bookingDuration,
    isSessionBasedBooking: el.isSessionBasedBooking,
    serviceImage: el.serviceImage,
  }));

  const bookingAttributes = bookingData?.services_link?.map((el) => ({
    serviceId: el.serviceId,
    attributes: el.attributes.map(({ updated_at, created_at, ...rest }) => ({
      ...rest,
    })),
  }));

  const data = (bookingServices || services)?.map((el, i) => ({
    key: i,
    description: (
      <div className="w-60 truncate" id={el.serviceId}>
        <div className="border-r border-gray-200 h-[26px]">
          {el.serviceName}
        </div>

        {bookingAttributes?.length
          ? bookingAttributes
              .filter((it) => it.serviceId === el.serviceId)
              .flatMap((att) => att.attributes)
              .map((att) => (
                <ul key={att.id}>
                  <li className="text-grey-light text-xs">{att.value}</li>
                </ul>
              ))
          : ""}

        {assignedAttributes?.length
          ? assignedAttributes
              .filter((it) => it.serviceId === el.serviceId)
              .flatMap((att) => att.attributes)
              .filter(
                (attr) =>
                  !bookingAttributes
                    ?.flatMap((service) => service.attributes)
                    ?.some(
                      (bookingAttr) =>
                        bookingAttr.attributeSku === attr.attributeSku
                    )
              )
              .map((att) => (
                <ul key={att.id}>
                  <li className="text-grey-light text-xs">{att.value}</li>
                </ul>
              ))
          : ""}
      </div>
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

  const handleSplitCurrency = (arg) => {
    const value = arg?.label || arg;
    return value?.split(" ").pop()?.[1];
  };

  const serviceTaxFromTable = Object.entries(tax).map(([key, val]) => ({
    [key]: val === "undefined undefined" ? "" : val,
  }));

  const availableAssignedAtt = assignedAttributes?.flatMap(
    (el) => el.attributes
  );

  const availableBookingAtt = bookingAttributes?.flatMap((el) => el.attributes);

  const today = moment().startOf("day");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreateInvoice = async () => {
    if (!currency) {
      return message.error("Currency is required", 2);
    }
    if (!language) {
      return message.error("Language is required", 2);
    }
    if (!paymentTerm) {
      return message.error("Payment term is required", 2);
    }
    if (!email) {
      return message.error("Email is required", 2);
    }
    if (!emailPattern.test(email)) {
      return message.error("Invalid email format", 2);
    }
    if (!mobile) {
      return message.error("Mobile number is required", 2);
    }
    if (!whatsapp) {
      return message.error("WhatsApp is required", 2);
    }
    if (!invoiceType) {
      return message.error("Invoice type is required", 2);
    }
    if (!billTo) {
      return message.error("Bill to is required", 2);
    }
    if (!orderNo) {
      return message.error("Order number is required", 2);
    }
    if (!invoiceDate) {
      return message.error("Invoice date is required", 2);
    }
    if (moment(invoiceDate).isBefore(today)) {
      return message.error("Invoice date cannot be before today", 2);
    }
    if (!dueDate) {
      return message.error("Due date is required", 2);
    }
    if (moment(dueDate).isBefore(moment(invoiceDate))) {
      return message.error("Due date cannot be before invoice date", 2);
    }
    if (invoiceType === "Credit Note" && !invoiceNumber?.length) {
      return message.error("Invoice number is required for Credit Note", 2);
    }
    if (!totalAmount) {
      return message.error("Total amount is required", 2);
    }

    if (paymentLinkCheckbox) {
      if (!paymentLinkEmail) {
        return message.error("Email is required for payment link", 2);
      }
      if (!emailPattern.test(paymentLinkEmail)) {
        return message.error("Invalid email format for payment link", 2);
      }
      if (!paymentLinkMobile) {
        return message.error("Mobile number is required for payment link", 2);
      }
      if (!paymentLinkWhatsapp) {
        return message.error("WhatsApp is required for payment link", 2);
      }
    }

    const payload = {
      subject: invoiceType,
      send_payment_link_to: {
        email: paymentLinkEmail,
        phone: paymentLinkMobile,
        whatsapp: paymentLinkWhatsapp,
      },
      invoiceOwner: `${firstName} ${lastName}`,
      invoiceType: invoiceType,
      countryId: bookingData?.venue?.countryId || 188,
      plexaarcustomerId: bookingData?.plexaarcustomerId || accountNumber,
      serviceId: bookingData?.serviceId || 0,
      bill_to: billTo,
      order_number: orderNo,
      billing_address: bookingData?.venue?.addressName || "",
      invoice_date: invoiceDate,
      due_date: dueDate,
      language: language,
      sales_person: "",
      payment_term: paymentTerm,
      invoice_template_id: 12,
      copy_to_email: email,
      copy_to_mobile_number: mobile,
      copy_to_whatsapp: whatsapp,
      serviceSKU: bookingData?.serviceSKU || "SKU123",
      serviceType: bookingData?.serviceType || "Consulting",
      paymentType:
        selectedPaymentMethod === "payByCard"
          ? "pay by card"
          : selectedPaymentMethod === "bankTransfer"
          ? "bank transfer"
          : "cash",
      customerFirstName: bookingData?.customerFirstName || firstName,
      customerLastName: bookingData?.customerLastName || lastName,
      customerEmail:
        bookingData?.customerEmail || primaryEmail || secondaryEmail,
      customerNumber:
        bookingData?.customerNumber || primaryMobile || secondaryMobile,
      providerId: bookingData?.providerId || 0,
      providerName: bookingData?.providerName || "",
      providerEmail: bookingData?.providerName || "",
      businessName: businessName,
      businessId: businessId,
      purchaseOrderId: bookingData?.purchaseOrderId || 0,
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      products: (bookingServices || services)?.map((el) => {
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
            (availableBookingAtt || availableAssignedAtt)
              ?.filter((it) => it.serviceId === el.serviceId)
              ?.map(({ id, ...rest }) => rest) || [],
        };
      }),
      status: bookingData?.appointments?.at(0)?.status || "Pending",
      taxType: "VAT",
      currency: currency?.label ? currency.label : currency,
      totalAmount: totalAmount,
      termsAndCondition: "Payment due within 30 days.",
      description: bookingData?.description || "",
      paymentDate: invoiceDate,
      paymentMethodId: 0,
      cartId: 0,
      payment_status: paymentStatus === "Paid" ? "paid" : "unpaid",
      balance: 0,
      discountType: "Percentage",
      discountPercentage: 0,
      totalDiscount: 0,
      walletPayment: true,
      createdBy: bookingData?.venue?.createdBy || userId,
      modifiedBy: bookingData?.venue?.modifiedBy || userId,
      original_invoice: invoiceType === "Credit Note" ? invoiceNumber : [],
    };

    const { isSuccess, isLoading, data } = await postData(
      endpoints.createInvoice,
      payload
    );
    if (isSuccess) {
      console.log("load", isLoading);

      setIsCreateLoading(isLoading);
      setCreateInvoiceRes({
        currency: data?.currency,
        subTotal: data?.subTotal,
        totalAmount: data?.totalAmount,
      });

      dispatch(setAppointment({}));
      navigate("/invoices");
    }
  };

  const handleCreateProformaInvoice = async () => {
    if (!currency) {
      return message.error("Currency is required", 2);
    }
    if (!invoiceType) {
      return message.error("Invoice type is required", 2);
    }
    if (!totalAmount) {
      return message.error("Total amount is required", 2);
    }

    const payload = {
      subject: invoiceType,
      invoiceOwner: `${firstName} ${lastName}`,
      invoiceType: invoiceType,
      services_link: (bookingServices || services)
        ?.map((el) => {
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
            amount: el.amount || 0,
          };
        })
        ?.filter(
          (service) =>
            (availableBookingAtt || availableAssignedAtt)
              ?.filter((it) => it.serviceId === service.serviceId)
              ?.map(({ id, ...rest }) => rest) || []
        ),
      attributes_link: availableBookingAtt || availableAssignedAtt || [],
      plexaarBookingId: plexaarBookingId,
      plexaarSalesOrderId: 0,
      countryId: bookingData?.venue?.countryId || 188,
      plexaarcustomerId: bookingData?.plexaarcustomerId || accountNumber,
      customerId: 0,
      serviceId: bookingData?.serviceId || 0,
      serviceSKU: bookingData?.serviceSKU || "SKU123",
      serviceType: bookingData?.serviceType || "Consulting",
      paymentType:
        selectedPaymentMethod === "payByCard"
          ? "pay by card"
          : selectedPaymentMethod === "bankTransfer"
          ? "bank transfer"
          : "cash",
      customerFirstName: bookingData?.customerFirstName || firstName,
      customerLastName: bookingData?.customerLastName || lastName,
      customerEmail:
        bookingData?.customerEmail || primaryEmail || secondaryEmail,
      customerNumber:
        bookingData?.customerNumber || primaryMobile || secondaryMobile,
      providerId: bookingData?.providerId || 0,
      providerName: bookingData?.providerName || "",
      providerEmail: bookingData?.providerName || "",
      businessName: businessName,
      businessId: businessId,
      purchaseOrderId: bookingData?.purchaseOrderId || 0,
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      status: bookingData?.appointments?.at(0)?.status || "Pending",
      totalTax: 0,
      currency: currency?.label ? currency.label : currency,
      totalPrice: totalAmount,
      totalAmount: totalAmount,
      termsAndCondition: "Payment due within 30 days.",
      description: bookingData?.description || "",
      paymentDate: invoiceDate,
      paymentMethodId: 0,
      cartId: 0,
      payment_status: paymentStatus === "Paid" ? "paid" : "unpaid",
      balance: 0,
      quantity: 0,
      discountType: "Percentage",
      discountPercentage: 0,
      totalDiscount: 0,
      walletPayment: true,
      createdBy: bookingData?.venue?.createdBy || userId,
      modifiedBy: bookingData?.venue?.modifiedBy || userId,
    };

    const { isSuccess, isLoading, data } = await postData(
      endpoints.createProformaInvoice,
      payload
    );
    if (isSuccess) {
      setIsCreateLoading(isLoading);
      setCreateInvoiceRes({
        currency: data?.currency,
        subTotal: data?.subTotal,
        totalAmount: data?.totalAmount,
      });
      dispatch(setAppointment({}));
      navigate("/invoices");
    }
  };

  const handleUserData = async () => {
    try {
      const res = await api.get(endpoints.getUserById, {
        params: {
          id: appointmentUserId,
        },
      });
      const { code } = res.data;
      if (code === 0) {
        const { user } = res.data.result;
        const { businssId, ...rest } = user;

        dispatch(
          setUser({
            businssId: appointmentBusinessId,
            ...rest,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (plexaarBookingId) {
      handleUserData();
    }
  }, [localStorage.getItem("accessToken")]);

  const handleGetBookingId = async () => {
    try {
      const res = await api.get(endpoints.getBookingId, {
        params: {
          plexaarBookingId,
          timeZone: "Europe/London",
          appointmentId,
        },
      });
      const { code, result } = res.data;
      if (code === 0) {
        setBookingData(result);
        const payment_status =
          result.payment_status === "paid" ? "Paid" : "Unpaid";
        setPaymentStatus(payment_status);
        setTotalAmount(result.totalAmount);
        const currencyValue = `${result.currency} (${result.currencySymbol})`;
        setCurrency({
          label: currencyValue,
          value: currencyValue,
        });
        setPaymentLinkCheckbox(
          result?.paymentOptions === "Pay_By_Link" ? true : false
        );
        setOrderNo(result.plexaarBookingId);
        const billToCustomer = `${result.customerFirstName} ${result.customerLastName}`;
        setBillTo({
          label: billToCustomer,
          value: billToCustomer,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (plexaarBookingId) {
      handleGetBookingId();
    }
  }, [localStorage.getItem("accessToken")]);

  return (
    <>
      <ReactHelmet title="Create Invoice" />
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
      <CreateInvoice
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
        handleChangeInvoiceDate={handleChangeInvoiceDate}
        handleDueDate={handleDueDate}
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
        servicesLoading={isServicesLoading}
        currenciesLoading={currenciesLoading}
        languagesLoading={languagesLoading}
        paymentTermsLoading={paymentTermsLoading}
        billToLoading={billToLoading}
        splitInvoiceLabelRender={splitInvoiceLabelRender}
        splitInvoice={splitInvoice}
        handleChangeSplitInvoice={handleChangeSplitInvoice}
        getPaymentTerms={getPaymentTerms}
        handleCreateInvoice={handleCreateInvoice}
        handleCreateProformaInvoice={handleCreateProformaInvoice}
        createInvoiceRes={createInvoiceRes}
        handleSplitCurrency={handleSplitCurrency}
        isCreateLoading={isCreateLoading}
        bookingServices={bookingServices}
      />
    </>
  );
};
export default CreateInvoiceContainer;
