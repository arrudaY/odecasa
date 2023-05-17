import React from 'react'
import styles from './SidebarItem.module.css'
import { Link } from 'react-router-dom';

const SidebarItem = ({ Icon, Text }) => {
  return (
    <div className={styles.container}>
      <Icon />
      {Text}
      
    </div>
  )
}

export default SidebarItem