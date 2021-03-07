import React from 'react';
import * as Icon from 'react-feather';
const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: <Icon.Home size={20} />,
    permissions: ['guest', 'buyer', 'merchant', 'admin'],
    navLink: '/'
  },
  {
    id: 'page2',
    title: 'Page 2',
    type: 'item',
    icon: <Icon.File size={20} />,
    permissions: ['guest', 'buyer', 'merchant', 'admin'],
    navLink: '/page2'
  },
  {
    id: 'accountSettings',
    title: 'Account Settings',
    type: 'item',
    icon: <Icon.Settings size={20} />,
    permissions: ['buyer', 'merchant', 'admin'],
    navLink: '/account-settings'
  }
];

export default navigationConfig;
