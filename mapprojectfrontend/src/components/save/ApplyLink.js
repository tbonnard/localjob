
import React from 'react';

import { Link } from 'react-router-dom'


const ApplyLink = ({project}) => {

  return (
      <Link to={`/job/${project.uuid}`} title="Appliquer">appliquer</Link>
  )
}

export default ApplyLink

