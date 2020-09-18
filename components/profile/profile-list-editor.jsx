import React from "react";
import ProfileListHeader from "./profile-list-header";
import {List, Space} from "antd";
import {StarOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons";
import {WishlistProvider} from "contexts/wishlist-context";

export default function ProfileListEditor({ list }) {
  return (
    <WishlistProvider>
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
              style={{
                background: '#fff',
                borderRight: '1px solid gainsboro',
                borderBottom: '1px solid gainsboro'
              }}
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
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              />
              {item.content}
            </List.Item>
          )}
        />
      )}
    </WishlistProvider>
  )
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


