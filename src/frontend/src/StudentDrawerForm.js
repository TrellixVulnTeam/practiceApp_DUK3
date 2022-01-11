import React, { useState } from 'react';
import {Drawer, Select, Button, Row} from 'antd';
import Form from "antd/es/form";
import Input from "antd/es/input";
import Col from "antd/es/grid/col";

import { addNewStudent} from "./client";
import Spin from "antd/lib/spin";
import {LoadingOutlined} from "@ant-design/icons";

const {Option} = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onClose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);
    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2))
        addNewStudent(student)
            .then(() => {
                console.log("student added")
                onClose();
                fetchStudents();
            }).catch(err => {
                console.log(err)
            }).finally(() => setSubmitting(false))
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title={"Add New Student"}
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
        >
            <Form layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  hideRequiredMark
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: "Name is Required!" }]}>
                            <Input placeholder="Enter Student Name"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ type: 'email', message: "Email is Required!" }]}>
                            <Input placeholder="Enter Student Name"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="gender"
                                   label="gender"
                                   rules={[{required: true, message:"Gender is Required!"}]}
                                   >
                            <Select placeholder="Please select gender">
                                <Option value="MALE">MALE</Option>
                                <Option value="FEMALE">FEMALE</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item>
                            <button type="primary" htmlType="submit">
                                Submit
                            </button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    {submitting && <Spin indicator={antIcon} />}
                </Row>
            </Form>
        </Drawer>
}

export default StudentDrawerForm;