import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../../../src/core/utils/commonGetSSRProps';
import ManagedUserProfile from '../../../../../src/stories/containers/Users/ManagedUserProfile/ManagedUserProfile';
import UserManagerLayout from '../../../../../src/stories/containers/Users/UsersManager/UserManagerLayout';
import { ManagerTabs } from '../../../../../src/stories/containers/Users/UsersManager/managerTabsEnum';
import type { NextPage } from 'next';

const ManageUserProfilePage: NextPage = () => (
  <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
    <ManagedUserProfile />
  </UserManagerLayout>
);

export default ManageUserProfilePage;

export const getServerSideProps = getSSRPropsDefaultAuth;
