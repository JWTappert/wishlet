import React, { useState } from "react";
import styled from "styled-components";
import {Button, Layout, Typography } from "antd";
import useQueryParam from "../../hooks/use-query-param";
const { Header } = Layout;
const { Title, Text } = Typography;

export default function ProfileListEditor({ list }) {

  function handleAddListItem() {}
  function setShowAddWishlist() {}

  return (
    <>
    <StyledHeader>
      {list && (
        <>
          <Title>{list.name}</Title>
          <Button onClick={handleAddListItem}>Add Item</Button>
        </>
      )}
      <Button onClick={() => setShowAddWishlist(true)}>
        Add List
      </Button>
    </StyledHeader>
      {list &&
        list.items.map((item) => (
          <React.Fragment>
            <Title>{item.name}</Title>
            <Text>{item.link}</Text>
          </React.Fragment>
        ))}
    </>  )
}

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border-top: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
`;