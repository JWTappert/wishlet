import React, { useState } from "react";
import styled from "styled-components";
import {Button, Layout, Typography} from "antd";
import {AddWishlistItemModal} from "components/wishlist";
const {Header} = Layout;
const {Text} = Typography;

export default function ProfileListHeader({ list }) {
  const [addItemOpen, setAddItemOpen] = useState(false);

  return (
    <StyledHeader>
      {list && (
        <>
          <Text>{list.name}</Text>
          <ActionsContainer>
            <Button onClick={() => console.log('share')}>Share List</Button>
            <Button onClick={() => setAddItemOpen(!addItemOpen)}>Add Item</Button>
          </ActionsContainer>
          <AddWishlistItemModal wishlistId={list.id} open={addItemOpen} toggleOpen={setAddItemOpen} />
        </>
      )}
    </StyledHeader>
  )
}

const ActionsContainer = styled.div``;
const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border-top: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
`;