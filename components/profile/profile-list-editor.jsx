import React, { useContext } from "react";
import ProfileListHeader from "./profile-list-header";
import {List, Space, Popconfirm, message} from "antd";
import {StarOutlined, LikeOutlined, DeleteOutlined} from "@ant-design/icons";
import {WishlistsContext} from "contexts/wishlists-context";

export default function ProfileListEditor({ list, showAddWishlist, setShowAddWishlist }) {
  const { removeItem } = useContext(WishlistsContext);
  return (
    <>
      <ProfileListHeader list={list} showAddWishlist={showAddWishlist} setShowAddWishlist={setShowAddWishlist} />
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
                <IconText
                  icon={DeleteOutlined}
                  text="Delete"
                  key="list-vertical-message"
                  clickHandler={removeItem}
                  listId={list.id}
                  itemId={item.id}
                />,
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
      </>
  )
}

const IconText = ({ icon, text, clickHandler, listId, itemId }) => {
  function confirm(e) {
    clickHandler(listId, itemId);
    message.success('Item removed');
  }

  function cancel(e) {
  }

  return (
    <Popconfirm
      title="Are you sure you want to remove this item?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Space>
        {React.createElement(icon)}
        <a>{text}</a>
      </Space>
    </Popconfirm>
  )
};


