import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import "./FormCustom.scss";
import { ObjectToArray, ObjValue } from "../until/genralFunction";
import { SwapOutlined } from "@ant-design/icons";
interface ResultForm {
  send: number;
  receive: string;
}
const FormCustom = () => {
  const [form] = useForm();
  const [currencies, setCurrencies] = useState<ObjValue[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [ToCurrency, setToCurrency] = useState<string>("USD");
  const [amountRecive, setAmountRecive] = useState<string>();
  // const validateForm = () => {};
  const onFinish = (value: ResultForm) => {
    message.loading({
      content: "Loading...",
    });
    swapCurrency(fromCurrency, ToCurrency, value.send);
  };

  const getCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.dev/v1/currencies");
      const data = await res.json();
      const formatData = ObjectToArray<object>(data);

      setCurrencies(formatData);
    } catch (error) {
      message.error({ content: `Error Fetching ${error}` });
    }
  };
  const swapCurrency = (from: string, to: string, amount: number) => {
    try {
      if (from === to) {
        console.log(
          "Dsadsad",
          amount.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );

        form.setFieldValue(
          "receive",
          amount.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        message.destroy();
        message.success("Success");
      }
      fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
        .then((resp) => resp.json())
        .then((data) => {
          const convertedAmount =
            (amount * data.rates[to])
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            " " +
            to;
          // setAmountRecive(convertedAmount);
          console.log("dsadsad", convertedAmount);

          form.setFieldValue("receive", convertedAmount);
          message.destroy();
          message.success("Success");
        });
    } catch (error) {
      message.destroy();
      message.error({
        content: "Error , Try do it again",
      });
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <Form
      className="main-form"
      layout="vertical"
      onFinish={onFinish}
      form={form}
      onValuesChange={(changedValues: ResultForm, values: ResultForm) => {
        if (!values.send) form.setFieldValue("receive", "");
        // if (changedValues.send )
        // console.log(changedValues, values);
      }}
      title="Swap"
    >
      <h1>Swap</h1>

      <Row style={{ marginBottom: 8, rowGap: 8 }}>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Space className="full-w" direction="vertical">
            <span className="font-bold">From</span>
            <Select
              className="select-currency"
              showSearch
              value={fromCurrency}
              style={{ width: "100%" }}
              onChange={setFromCurrency}
            >
              {currencies?.map((currency) => (
                <Select.Option key={currency.key} value={currency.key}>
                  {currency.key}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Col>

        <Col
          lg={8}
          md={24}
          sm={24}
          xs={24}
          className="flex align-center justify-center"
        >
          <SwapOutlined style={{ marginTop: 22 }} />
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Space className="full-w" direction="vertical">
            <span className="font-bold">To</span>
            <Select
              className="select-currency"
              showSearch
              value={ToCurrency}
              style={{ width: "100%" }}
              onChange={setToCurrency}
            >
              {currencies?.map((currency) => (
                <Select.Option key={currency.key} value={currency.key}>
                  {currency.key}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </Col>
      </Row>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Enter amount to send Please",
          },
        ]}
        required
        name={"send"}
        label="Amount to send"
      >
        <InputNumber
          decimalSeparator="."
          className="input-send"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          placeholder="Enter Amount to send "
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
          // formTarget={currencyFormatter(currency)}
          // parser={currencyParser}
        />
      </Form.Item>
      <Form.Item label="Amount to receive" name={"receive"}>
        <Input
          className="input-send"
          placeholder="Amount to receive"
          readOnly
        />
      </Form.Item>
      <Button
        type="primary"
        onClick={() => {
          form.validateFields().then(() => {
            form.submit();
          });
        }}
      >
        CONFIRM SWAP
      </Button>
    </Form>
  );
};

export default FormCustom;
