import { Modal, Select, Spin } from "antd";
import { FaAngleDown } from "react-icons/fa6";
import styles from "../createInvoice.module.css";

const AssignAttributeModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  attributeOptions,
  attributeVal,
  handleChangeAttributeVal,
  serviceForAtt,
}) => {
  return (
    <>
      <Modal
        title={
          <div className="capitalize">
            {serviceForAtt?.props?.children?.at(0)}
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Assign"
      >
        <div
          className={`min-h-12 mt-5 bg-white border rounded-lg mb-5 custom-border ${styles.selectWithLabel}`}
        >
          <div className="pl-[11px] text-[10px] pt-1 text-grey-light">
            Attribute
          </div>
          <Select
            className="bg-none border-0 w-full"
            mode="multiple"
            allowClear
            suffixIcon={<FaAngleDown className="-mt-4" />}
            placeholder="Select Attribute"
            value={attributeVal[serviceForAtt?.props?.id] || undefined}
            onChange={handleChangeAttributeVal}
            options={attributeOptions}
            bordered={false}
          />
        </div>
      </Modal>
    </>
  );
};
export default AssignAttributeModal;
