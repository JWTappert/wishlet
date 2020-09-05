import React, {useState} from "react";
import {Descriptions} from "antd";

export default function ProfileDetails({ user }) {
  const {
    displayName,
    email,
    bio,
    website,
    facebook,
    twitter,
    youtube,
    pinterest,
    instagram } = user || {};

  return (
      <Descriptions>
        <Descriptions.Item label="Name">{displayName}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Bio">{bio}</Descriptions.Item>
        <Descriptions.Item label="Website">{website}</Descriptions.Item>
        <Descriptions.Item label="Facebook">{facebook}</Descriptions.Item>
        <Descriptions.Item label="Twitter">{twitter}</Descriptions.Item>
        <Descriptions.Item label="Youtube">{youtube}</Descriptions.Item>
        <Descriptions.Item label="Pinterest">{pinterest}</Descriptions.Item>
        <Descriptions.Item label="Instagram">{instagram}</Descriptions.Item>
      </Descriptions>
  )
}