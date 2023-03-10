import styled from '@emotion/styled';
import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../../../src/core/utils/commonGetSSRProps';
import DeleteAccount from '../../../../../src/stories/containers/Users/DeleteAccount/DeleteAccount';
import UserManagerLayout from '../../../../../src/stories/containers/Users/UsersManager/UserManagerLayout';
import { ManagerTabs } from '../../../../../src/stories/containers/Users/UsersManager/managerTabsEnum';
import lightTheme from '../../../../../styles/theme/light';
import type { NextPage } from 'next';

const DeleteUserAccountPage: NextPage = () => (
  <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
    <Container>
      <DeleteAccount />
    </Container>
  </UserManagerLayout>
);

export default DeleteUserAccountPage;

export const getServerSideProps = getSSRPropsDefaultAuth;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
