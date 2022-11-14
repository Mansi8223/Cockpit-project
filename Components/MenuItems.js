import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
const MenuItems = (props) => {
  const [path, setPath] = useState('');
  
  useEffect(()=>{
    setPath(Router.route)
  },[])
  if(path==props.path || (props.multipath=="1" && ((props.haspath1=="1" && path==props.path1) || (props.haspath2=="1" && path==props.path2) || (props.haspath3=="1" && path==props.path3) || (props.haspath4=="1" && path==props.path4)|| (props.haspath5=="1" && path==props.path5)|| (props.haspath6=="1" && path==props.path6)|| (props.haspath7=="1" && path==props.path7) || (props.haspath8=="1" && path==props.path8)))){
    return (
        <Link href={props.path}>
            <div className={`active col-11 p-4 `}>
                <img src={props.activeImage} alt='icon'/>
                <h5 className={`color-primary f-700 l-22`}>{props.value}</h5>
            </div>
        </Link>
    )
  }
  else{
    return (
        <Link  href={props.path}>
            <div className={`inactive col-11 p-4`}>
                <img src={props.inactiveImage} alt='icon'/>
                <h5 className={`color-white f-700 l-22`}>{props.value}</h5>
            </div>
        </Link>
    )
  }
}

export default MenuItems