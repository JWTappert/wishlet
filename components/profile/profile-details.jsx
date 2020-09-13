import React from "react";
import styled from "styled-components";
import { Spin, Descriptions } from "antd";
import useProfile from "../../hooks/use-profile";
import { useRouter } from "next/router";

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
    <>
      {loading && (
        <Loading>
          <Spin size="large" />
        </Loading>
      )}
      {profile && (
        <Descriptions>
          <Descriptions.Item label="Name">{`${first} ${last}`}</Descriptions.Item>
          <Descriptions.Item label="Email">{email}</Descriptions.Item>
          <Descriptions.Item label="Website">{website}</Descriptions.Item>
          <Descriptions.Item label="Facebook">{facebook}</Descriptions.Item>
          <Descriptions.Item label="Twitter">{twitter}</Descriptions.Item>
          <Descriptions.Item label="Youtube">{youtube}</Descriptions.Item>
          <Descriptions.Item label="Pinterest">{pinterest}</Descriptions.Item>
          <Descriptions.Item label="Instagram">{instagram}</Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
}

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;
