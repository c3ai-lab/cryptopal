import React from 'react';
import * as Icon from 'react-feather';
const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: <Icon.Home size={20} />,
    permissions: ['buyer', 'merchant', 'admin'],
    navLink: '/dashboard'
  },
  {
    id: 'transactions',
    title: 'Transactions',
    type: 'item',
    icon: <Icon.Archive size={20} />,
    permissions: ['buyer', 'merchant', 'admin'],
    navLink: '/transactions'
  },
  {
    id: 'sendTokens',
    title: 'Send Payment',
    type: 'item',
    icon: <Icon.DollarSign size={20} />,
    permissions: ['buyer', 'merchant', 'admin'],
    navLink: '/send'
  },
  {
    id: 'accountSettings',
    title: 'Account Settings',
    type: 'item',
    icon: <Icon.Settings size={20} />,
    permissions: ['buyer', 'merchant', 'admin'],
    navLink: '/account-settings'
  },
  {
    id: 'products',
    title: 'My Products',
    type: 'item',
    icon: <Icon.Octagon size={20} />,
    permissions: ['merchant', 'admin'],
    navLink: '/products'
  },
  {
    id: 'docs',
    title: 'Documentation',
    type: 'external-link',
    newTab: true,
    icon: <Icon.FileText size={20} />,
    permissions: ['guest', 'merchant', 'admin'],
    navLink: 'http://docs.bluecryptopal.com'
  }
];

export default navigationConfig;
