import React, {useContext, useState} from "react";
import styled from "styled-components";
import { Row, Col, Spin, Typography, Descriptions, Avatar, Statistic } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import {UserContext} from "contexts/user-context";
import {observer} from "mobx-react-lite";
import ProfileEditModal from "./profile-edit-modal";

const { Title } = Typography;

const ProfileDetails = observer(() => {
  const User = useContext(UserContext);
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
  } = User.profile || {};

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
           {User.profile && (
             <Row>
               <Row gutter={[50, 50]} justify="end">
                 <Col>
                   <Statistic title="Wishlists" value={User.wishlistCount} />
                 </Col>
                 <Col>
                   <Statistic title="Items" value={User.items} />
                 </Col>
                 <Col>
                   <Statistic title="Following" value={User.following} />
                 </Col>
                 <Col>
                   <Statistic title="Followers" value={User.followers} />
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
       {User.loading && (
         <Loading>
           <Spin size="large" />
         </Loading>
       )}
       <ProfileEditModal showEdit={editing} setEdit={setEditing} />
     </Container>
  );
});
export default ProfileDetails;

const Container = styled.div`
  padding: 1em 5em 2em 5em;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;
