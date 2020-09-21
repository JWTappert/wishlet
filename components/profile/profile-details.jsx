import React, {useContext, useState} from "react";
import styled from "styled-components";
import { Row, Col, Spin, Typography, Descriptions, Avatar, Statistic } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import ProfileEditModal from "./profile-edit-modal";
import useQueryParam from "hooks/use-query-param";
import {ProfileContext} from "contexts/profile-context";

const { Title } = Typography;

export default function ProfileDetails() {
  const { state } = useContext(ProfileContext);
  const { profile, loading, error } = state;
  const [editing, setEditing] = useState(false);

  const {
    photoURL,
    email,
    displayName,
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
           <Title level={4}>{displayName}</Title>
           {photoURL && (
             <Avatar
               style={{ margin: "0 .5em" }}
               size={100}
               src={photoURL}
             />
           )}
           {!photoURL && (<Avatar
             style={{ margin: "0 .5em" }}
             size={100}
             icon={<UserOutlined />}
           />)}
         </Col>
         <Col span={18}>
           {profile && (
             <Row>
               <Row gutter={[50, 50]} justify="end">
                 <Col>
                   <Statistic title="Wishlists" value={22} />
                 </Col>
                 <Col>
                   <Statistic title="Items" value={202} />
                 </Col>
                 <Col>
                   <Statistic title="Following" value={2} />
                 </Col>
                 <Col>
                   <Statistic title="Followers" value={10} />
                 </Col>
                 <Col>
                   <a onClick={() => setEditing(true)}>
                     <EditOutlined />
                   </a>
                 </Col>
               </Row>
               <Row>
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
               </Row>
             </Row>
           )}
         </Col>
       </Row>
       {loading && (
         <Loading>
           <Spin size="large" />
         </Loading>
       )}
       <ProfileEditModal showEdit={editing} setEdit={setEditing} />
     </Container>
  );
}

const Container = styled.div`
  padding: 1em 5em 2em 5em;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;
