import * as React from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Alert } from './dashboard/Alert';

export const items = [
  {
    text: 'Dashboard',
    selected: true,
    route: '/home/dashboard',
    icon: 'k-i-grid'
  }
];

export const DrawerContainer = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(true);
  const [toggle, setToggled] = React.useState(true)

  const handleClick = () => {
    setExpanded(!expanded);
    setToggled(!toggle)
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
    <div>
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
      <div className={toggle ? 'user-container': 'hidden'} > 

    <img src={require('../assets/people/user-avatar.jpg')} alt="user avatar"/> 

       <h1>Jaxons Danniels</h1> 
       <div className="user-email">jaxons.daniels@company.com</div> 
       <Link to="/"  style={{ textDecoration: 'none' }}>
       <Button className="user-button" >Sign Out</Button> 
       </Link>
     </div>
     
   
      <Drawer
        expanded={expanded}
        position={'start'}
        mode={'push'}
        width={240}
        items={items.map((item) => ({
          ...item,
          selected: item.text === selected,
        }))}
        onSelect={onSelect}
        className="drawer"
      >
        <DrawerContent>{props.children}<Outlet/> </DrawerContent>
      </Drawer>
    </div>

  );
};