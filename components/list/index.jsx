import React from "react";
import Link from "next/link";
import {Avatar, List, Space} from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const data = [
  {
    name: 'SVG Animations: From Common UX Implementations to Complex Responsive Animation',
    image: 'https://m.media-amazon.com/images/I/51iV+wxhw9L._SS135_.jpg',
    price: 42.99,
    category: 'book',
    subcategory: 'technology'
  },
  {
    name: 'Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!',
    image: 'https://m.media-amazon.com/images/I/51wOOMQ+F3L._SS135_.jpg',
    price: 5.39,
    category: 'book',
    subcategory: 'finance'
  },
  {
    name: "The Boggleheads' Guide to Investing" ,
    image: 'https://m.media-amazon.com/images/I/51hIN5N4BlL._SS135_.jpg',
    price: 14.39,
    category: 'book',
    subcategory: 'finance'
  },
  {
    name: 'Microsoft Sculpt Ergonomic Keyboard for Business',
    image: 'https://m.media-amazon.com/images/I/31dAfO9Ge1L._SS135_.jpg',
    price: 66.43,
    category: 'electronics',
    subcategory: 'keyboard'
  },
  ];

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function Wishlist({}) {
  return (
    <List
      itemLayout="horizontal"
      size="large"
      dataSource={data}
      pagination={{
        onChange: page => console.log({page}),
        pageSize: 2
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
  )
}
