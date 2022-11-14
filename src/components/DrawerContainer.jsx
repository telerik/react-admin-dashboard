import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Alert } from './dashboard/Alert';

export const items = [
  {
    text: 'Dashboard',
    selected: true,
    route: '/dashboard',
  }
];

export const DrawerContainer = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(true);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const onSelect = (e) => {
    navigate(e.itemTarget.props.route);
  };

  const setSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
        
    if (currentPath) {
      return currentPath;
    }
  };

  const selected = setSelectedItem(location.pathname);

  return (
    <div className="drawer-container-wrapper">
       <div className="custom-toolbar">
        <Button icon="menu" onClick={handleClick} />
        <span className="overview">Overview</span>
        <div className="right-widget">
          <div className="alert-container">
          <Alert/>
          </div>
        <a href="#" >
             About
         </a>
        </div>
      </div>
      
      <Drawer
        expanded={expanded}
        position={'start'}
        mode={'push'}
        width={120}
        items={items.map((item) => ({
          ...item,
          selected: item.text === selected,
        }))}
        onSelect={onSelect}
        className="drawer"
      >
        <DrawerContent>{props.children}</DrawerContent>
      </Drawer>
    </div>
  );
};