import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div 
      style={{  overflowX:'hidden' , zIndex:'1',position: 'fixed', display: 'flex', height: '100vh' }}
    >
      <CDBSidebar  textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content ">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;




// import React from 'react';
// import styled from 'styled-components';
// import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

// const StyledSideNav = styled.div`   
//     position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
//     height: 100%;
//     width: 150px;     /* Set the width of the sidebar */
//     z-index: 1;      /* Stay on top of everything */
//     top: 3.5em;      /* Stay at the top */
    
//     background-color: #222; /* Black */
//     overflow-x: hidden;     /* Disable horizontal scroll */
//     padding-top: 200px;
//     padding-left: 20px;
//     font-size: 7px;
//     margin-top:45px;
// `;

// class SideNav extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activePath: props.location.pathname,
//             items: [
//                 {
//                   path: "/quizshow/"+localStorage.getItem('isbatch'), /* path is used as id to check which NavItem is active basically */
//                   name: ' Quiz',
                  
//                   key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
//                 },
//                 {
//                   path: "/attendancedetail/"+localStorage.getItem('isbatch'),
//                   name: 'Attendance',
                  
//                   key: 2
//                 },
//                 {
//                   path: "/batchlist/"+localStorage.getItem('isbatch'),
//                   name: '  Students',
                  
//                   key: 3
//                 },
//               ]
//         }
//     }

//     onItemClick = (path) => {
//         this.setState({ activePath: path });
//     }

//     render() {
//         const { items, activePath } = this.state;
//         return(
//             <div>
//             <StyledSideNav>
//                 {
//                     items.map((item) => {
//                         return (
//                             <NavItem 
//                                 path={item.path}
//                                 name={item.name}
//                                 css={item.css}
//                                 onItemClick={this.onItemClick}
//                                 active={item.path === activePath}
//                                 key={item.key}>
                                    
//                                 </NavItem>
                            
//                         );
//                     })
//                 }
//             </StyledSideNav>
//             </div>
//         );
//     }
// }

// const RouterSideNav = withRouter(SideNav);

// const StyledNavItem = styled.div`
//     height: 100px;
//     width: 105px; /* width must be same size as NavBar to center */
//     text-align: center; /* Aligns <a> inside of NavIcon div */
//     margin-bottom: 0;   /* Puts space between NavItems */
//     a {
//         font-size: 3em;
//         color: ${(props) => props.active ? "white" : "#9FFFCB"};
//         :hover {
//             opacity: 0.7;
//             text-decoration: none; /* Gets rid of underlining of icons */
//         }  
//     }
// `;

// class NavItem extends React.Component {
//     handleClick = () => {
//         const { path, onItemClick } = this.props;
//         onItemClick(path);
//     }

//     render() {
//         const { active } = this.props;
//         return(
            
//             <StyledNavItem active={active}>
//                 <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
//                     <NavIcon>{this.props.name}</NavIcon>
//                 </Link>
//             </StyledNavItem>
//         );
//     }
// }

// const NavIcon = styled.div`
// `;

// export default class Sidebar extends React.Component {
//     render() {
//         return (
//             <RouterSideNav></RouterSideNav>
//         );
//     }
// }




