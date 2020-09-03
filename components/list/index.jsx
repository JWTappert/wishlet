import React from "react";
import Link from "next/link";
import {Avatar, Button, List, Space} from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function Wishlist({ wishlist, handleAddItem }) {
  return (
    <React.Fragment>
    <Button onClick={() => handleAddItem()}>Add Item</Button>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={wishlist}
        pagination={{
          onChange: page => console.log({page}),
          pageSize: 50
        }}
        renderItem={item => (
        <List.Item key={item.name} actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}>
          <List.Item.Meta
            avatar={<Avatar shape="square" size={100} src={item.image} />}
            title={<Link href=""><a>{item.name}</a></Link>}
            description={`Price: ${item.price} - Category: ${item.category}/${item.subcategory}`} />
        </List.Item>
      )}>
      </List>
    </React.Fragment>
  )
}
