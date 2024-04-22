
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const ProjectPropertyNameProfile = ({item}) => {

  return (
    <div className='projectName'>
      {item.properties[0].name
       ? 
      <Link className='buttonFollowed' to={`/commerce/${item.properties[0].uuid}`} title={item.properties[0].display_name}>{item.properties[0].name}</Link>
      :
      <Link className='buttonFollowed' to={`/commerce/${item.properties[0].uuid}`} title={item.properties[0].display_name}>{item.properties[0].display_name.substring(0, 9)}</Link>
      }

    </div>
  )
}

export default ProjectPropertyNameProfile