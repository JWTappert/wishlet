import React, { useState, useContext } from "react";
import styled from "styled-components";
import {Button, Layout, Popconfirm, Space, Typography} from "antd";
import {AddWishlistItemModal} from "components/wishlist";
import useQueryParam from "hooks/use-query-param";
import {UserContext} from "contexts/user-context";
const {Header} = Layout;
const {Text} = Typography;

export default function ProfileListHeader({ list, showAddWishlist, setShowAddWishlist }) {
  const uid = useQueryParam("uid");
  const User = useContext(UserContext);
  const [addItemOpen, setAddItemOpen] = useState(false);

  async function confirm(wishlistId) {
    if (!wishlistId || !uid) return;
    try {
      await User.deleteWishlist(wishlistId, uid)
      User.selectedList = null;
    } catch(error) {
      console.error(error);
    }
  }

  function cancel() {
  }

  return (
    <StyledHeader>
        <>
        <Text>{list ? list.name : 'Select a list'}</Text>
          <ActionsContainer>
            <Button onClick={() => setShowAddWishlist(!showAddWishlist)}>Add List</Button>
            {list && (
              <>
                <Button onClick={() => console.log('share')}>Share List</Button>
                <Button>
                  <Popconfirm
                    title="Are you sure you want to remove this wishlist?"
                    onConfirm={() => confirm(list.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    Delete List
                  </Popconfirm>
                </Button>
                <Button onClick={() => setAddItemOpen(!addItemOpen)}>Add Item</Button>
                </>
              )}
          </ActionsContainer>
          {list && <AddWishlistItemModal wishlistId={list.id} open={addItemOpen} toggleOpen={setAddItemOpen} />}
        </>
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