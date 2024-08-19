import { useEffect, useState } from "react";
import PaymentTermAddModal from "./PaymentTermModal";
import endpoints from "api/endpoints";
import api from "api/axios";
import { useSelector } from "react-redux";
import { Form } from "antd";
import usePost from "hooks/usePost";

const PaymentTermAddModalContainer = ({
  setIsPaymentTermDropdown,
  getPaymentTerms,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { businssId: businessId } = useSelector((state) => state.auth.user);
  const { postData } = usePost();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      due_days: values.dueDays,
      countryId: 188,
      businessId,
    };
    const { isSuccess } = await postData(endpoints.paymentTerms, payload);
    if (isSuccess) {
      getPaymentTerms();
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsPaymentTermDropdown(false);
    }
  }, [isModalOpen]);

  return (
    <>
      <PaymentTermAddModal
        showModal={showModal}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={onFinish}
        form={form}
      />
    </>
  );
};

export default PaymentTermAddModalContainer;
