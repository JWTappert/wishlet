import React from "react";
import ProfileListHeader from "./profile-list-header";
import {List, Space} from "antd";
import {StarOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";

export default function ProfileListEditor({ list }) {
  return (
    <React.Fragment>
      <ProfileListHeader list={list} />
      {list && (
        <List
          dataSource={list.items}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.link}>{item.name}</a>}
                description={"Description!"}
              />
              {item.content}
            </List.Item>
          )}
        />
      )}
    </React.Fragment>
  )
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


