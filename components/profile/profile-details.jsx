import React, {useContext, useState} from "react";
import styled from "styled-components";
import { Row, Col, Spin, Typography, Descriptions, Avatar, Statistic } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import {UserContext} from "contexts/user-context";
import {observer} from "mobx-react-lite";

const { Title } = Typography;

const ProfileDetails = observer(() => {
  const user = useContext(UserContext);
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
  } = user.profile || {};

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
           {user.profile && (
             <Row>
               <Row gutter={[50, 50]} justify="end">
                 <Col>
                   <Statistic title="Wishlists" value={user.wishlistCount} />
                 </Col>
                 <Col>
                   <Statistic title="Items" value={user.items} />
                 </Col>
                 <Col>
                   <Statistic title="Following" value={user.following} />
                 </Col>
                 <Col>
                   <Statistic title="Followers" value={user.followers} />
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
       {user.loading && (
         <Loading>
           <Spin size="large" />
         </Loading>
       )}
       {/*<ProfileEditModal showEdit={editing} setEdit={setEditing} />*/}
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
