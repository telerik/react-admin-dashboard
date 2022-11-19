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
  },
  {
    text: 'Performance and sales',
    selected: false,
    route: '/home/performance-and-sales',
    icon: 'k-icon k-i-notification k-i-globe'
  },
  {
    text: 'Products',
    selected: false,
    route: '/home/products',
    icon: 'k-icon k-i-aggregate-fields',
  },
  { separator: true },
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
    <div>
      <div className="custom-toolbar">
        <Button icon="menu" onClick={handleClick} />
        <span className="overview">Overview</span>
        <div className="right-widget">
          <div className="alert-container">
          <Alert/>
          </div>
          <Link to="/home/about" style={{color: '#424242'}}>About</Link>             

        </div>
      </div>

     <div>

     <div className='user-container' > 
        <img src={require('../assets/people/user-avatar.jpg')} alt="user avatar"/> 
       <h1>Jaxons Danniels</h1> 
       <div className="user-email">jaxons.daniels@company.com</div> 
       <Link to="/"  style={{ textDecoration: 'none' }}>
       <Button className="user-button" style={{
          backgroundColor: 'white'
       }}>Sign Out</Button> 
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
 
    </div>

  );
};