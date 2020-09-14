import React from "react";
import styled from "styled-components";
import { Row, Col, Spin, Typography, Descriptions, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useProfile from "../../hooks/use-profile";
import { useRouter } from "next/router";

const { Title } = Typography;

export default function ProfileDetails() {
  const router = useRouter();
  const { uid } = router.query;
  const [profile, loading, error] = useProfile(uid);
  const {
    avatar,
    email,
    first,
    last,
    website,
    facebook,
    twitter,
    youtube,
    pinterest,
    instagram,
  } = profile || {};

  return (
    <Container>
      <Row>
        <Col span={6}>
          <Title level={4}>{`${first} ${last}`}</Title>
          <Avatar
            style={{ margin: "0 .5em" }}
            size={100}
            icon={<UserOutlined />}
          />
        </Col>
        <Col span={18}>
          {profile && (
            <Descriptions>
              <Descriptions.Item label="Email">{email}</Descriptions.Item>
              <Descriptions.Item label="Website">{website}</Descriptions.Item>
              <Descriptions.Item label="Facebook">{facebook}</Descriptions.Item>
              <Descriptions.Item label="Twitter">{twitter}</Descriptions.Item>
              <Descriptions.Item label="Youtube">{youtube}</Descriptions.Item>
              <Descriptions.Item label="Pinterest">
                {pinterest}
              </Descriptions.Item>
              <Descriptions.Item label="Instagram">
                {instagram}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Col>
      </Row>
      {loading && (
        <Loading>
          <Spin size="large" />
        </Loading>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;
