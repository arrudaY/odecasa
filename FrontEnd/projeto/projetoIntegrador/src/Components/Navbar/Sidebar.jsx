import React from 'react'
import styles from './Sidebar.module.css'
import { 
  FaTimes, 
  FaHouseUser, 
  FaUserCheck
} from 'react-icons/fa'

import SidebarItem from './SidebarItem'


const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <div className={styles.container} sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <div>
        <SidebarItem Icon={FaHouseUser} Text="Logar" />
        <SidebarItem Icon={FaUserCheck} Text="Cadastrar" />
      </div>
    </div>
  )
}

export default Sidebar