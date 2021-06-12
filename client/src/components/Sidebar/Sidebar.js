import React from "react";
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

const Sidebar = () => {
  
  const location = useLocation();

  return (
    <div>
      <div class="div-block-15">
        <ul role="list" class="list">
          <li class={location.pathname == '/'?'list-item-active':'list-item'} ><Link to='/'>Today</Link></li>
          <li class={location.pathname == '/timesheet'?'list-item-active':'list-item'} ><Link to='/timesheet'>My Timesheet</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
