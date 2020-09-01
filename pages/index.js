import React from "react";
import { DatePicker } from "antd";
import {Typography} from "antd";
import Wishlist from "components/list";

export default function Home() {
  const {Title} = Typography;
  return <div>
   <Title>Hello World</Title>
    <Wishlist />
  </div>
}
