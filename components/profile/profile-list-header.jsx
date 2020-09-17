import React from "react";
import styled from "styled-components";
import {Button, Layout, Typography} from "antd";
const {Header} = Layout;
const {Text} = Typography;

export default function ProfileListHeader({ list }) {
  return (
    <StyledHeader>
      {list && (
        <>
          <Text>{list.name}</Text>
          <ActionsContainer>
            <Button onClick={() => console.log('share')}>Share List</Button>
            <Button onClick={() => console.log('add')}>Add Item</Button>
          </ActionsContainer>
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