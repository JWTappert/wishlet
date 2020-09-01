import React from "react";
import Link from "next/link";
import { List } from "antd";

const data = [
  { title: 'Title 1', description: 'Description'},
  { title: 'Title 2', description: 'Description'},
  { title: 'Title 3', description: 'Description'},
  { title: 'Title 4', description: 'Description'},
  { title: 'Title 5', description: 'Description'},
  { title: 'Title 6', description: 'Description'},
  ];

export default function Wishlist({}) {
  return (
    <List itemLayout="horizontal" dataSource={data} renderItem={item => (
      <List.Item>
        <List.Item.Meta title={<Link href=""><a>{item.title}</a></Link>} desciption={item.description} />
      </List.Item>
    )}>
    </List>
  )
}