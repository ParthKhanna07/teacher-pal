import * as React from 'react';
import { Sidenav, Nav, Button, Icon, Toggle, Dropdown } from 'rsuite';
import DefaultPage from '@/side';

export default function SideNav() {
  return (
    <DefaultPage
      examples={['basic', 'appearance', 'toggle', 'divider-panel']}
      dependencies={{ Sidenav, Nav, Button, Icon, Toggle, Dropdown }}
    />
  );
}