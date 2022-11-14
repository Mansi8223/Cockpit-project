import React from 'react'
import MenuItems from './MenuItems'
const MenuBar = () => {
  return (
    <div className={`col-10 d-flex d-flex-column d-align-center gap-1 p-5`}>
        <MenuItems value="Tasks" activeImage="/images/Subtract.png" inactiveImage="/images/Subtract (1).png" path="/TaskWrapper" path1="/TaskWrapper/[id]" path2="/NewRequest" path3="/Template" path4="/NewRequest/[id]" path5="/SubTasks/[id]" path6="/ViewSubTask/[id]" path7="/CreateTask" path8="/SubTaskForm/[id]" haspath1="1"  haspath2="1"  haspath3="1" haspath4="1" haspath5="1" haspath6="1" haspath7="1" haspath8="1" multipath="1"></MenuItems>
        <MenuItems value="Clients" activeImage="/images/eva_person-done-fill.png" inactiveImage="/images/eva_person-done-fill (1).png" path="/Clients" path1="/Clients/[id]" path2="/AddNewTransaction/[id]" path3="/AddNewClient" haspath1="1" haspath2="1" haspath3="1" multipath="1"></MenuItems>
        <MenuItems value="Showing Assistant" activeImage="/images/fa-solid_car-side.png" inactiveImage="/images/fa-solid_car-side (1).png" path="/ShowingAssistant" path1="/ShowingAssistant/[id]" path2="/AddNewAssistant" haspath1="1" haspath2="1" multipath="1"></MenuItems>
        <MenuItems value="Messages" activeImage="/images/eva_message-circle-fill.png" inactiveImage="/images/eva_message-circle-fill (1).png" path="/Messages" path1="/DisputeMessages" haspath1="1" multipath="1"></MenuItems>
        <MenuItems value="Task Price" activeImage="/images/feather_dollar-sign.png" inactiveImage="/images/feather_dollar-sign (1).png" path="/TaskPrice" multipath="0"></MenuItems>
    </div>
  )
}

export default MenuBar
