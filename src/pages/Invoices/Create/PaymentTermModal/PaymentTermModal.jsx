import { Form, Button, Input, InputNumber, Modal } from "antd";
import AddNewBtn from "components/AddNewBtn/AddNewBtn";

const PaymentTermAddModal = ({
  showModal,
  isModalOpen,
  handleCancel,
  onFinish,
  form,
}) => {
  return (
    <>
      <AddNewBtn click={showModal} />
      <Modal
        title="Add Payment Term"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          className="mt-5"
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input placeholder="Enter Description" />
          </Form.Item>

          <Form.Item
            name="dueDays"
            label="Due Days"
            rules={[{ required: true, message: "Please input due days!" }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Enter Due Days"
              min={0}
            />
          </Form.Item>

          <Form.Item className="flex justify-end -mt-[24px] -mb-[20px] py-5">
            <Button className="mr-2 my-1" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="my-1" type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PaymentTermAddModal;
