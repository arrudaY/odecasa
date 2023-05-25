import React from 'react'
import styles from './SidebarItem.module.css'
import { Link } from 'react-router-dom';

const SidebarItem = ({ Icon, Text, funcao }) => {


  return (
    <div onClick={funcao} className={styles.container}>
      <Icon />
      {Text}
      
    </div>
  )
}

export default SidebarItem