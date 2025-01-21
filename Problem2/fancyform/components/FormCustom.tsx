import React, { useState } from "react";
import { Button, Form, InputNumber, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import "./FormCustom.scss";
const locale = window.navigator.language || "de-DE";
import currencyList from "../until/currencyList";
const FormCustom = () => {
  const currencyOptions = currencyList.data.map((c) => ({
    label: c.CcyNm,
    value: `${c.CtryNm}::${c.Ccy}`,
  }));
  const [form] = useForm();
  const [currency, setCurrency] = useState<any>(currencyOptions[0].value);
  // const validateForm = () => {};
  const onFinish = (value: string) => {
    console.log("sadasd", value);

    message.success("Success");
  };
  const currencyFormatter =
    (selectedCurrOpt: string) => (value: number | bigint) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: selectedCurrOpt.split("::")[1],
      }).format(value);
    };
  const currencyParser = (val: any) => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0";
      }

      // detecting and parsing between comma and dot
      const group = new Intl.NumberFormat(locale)
        .format(1111)
        .replace(/1/g, "");
      const decimal = new Intl.NumberFormat(locale)
        .format(1.1)
        .replace(/1/g, "");
      let reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
      //  => 1232.21 €

      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21

      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
      const needsDigitsAppended = digitsAfterDecimalCount > 2;

      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      }

      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      className="main-form"
      layout="vertical"
      onFinish={onFinish}
      form={form}
      title="Swap"
    >
      <h1>Swap</h1>

      <Select
        showSearch
        value={currency}
        style={{ width: "100%", marginTop: "1rem" }}
        onChange={setCurrency}
      >
        {currencyOptions.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
      <Form.Item required label="Amount to send">
        <InputNumber
          className="input-send"
          // formatter={(value) =>
          //   `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          // }
          placeholder="Enter Amount to send "
          type="number"
          formTarget={currencyFormatter(currency)}
          parser={currencyParser}
        />
      </Form.Item>
      <Form.Item label="Amount to recive">
        <InputNumber placeholder="Amount to recive" type="number" />
      </Form.Item>
      <Button
        type="default"
        onClick={() => {
          form.submit();
        }}
      >
        CONFIRM SWAP
      </Button>
    </Form>
  );
};

export default FormCustom;
