
import React, { useState } from 'react';

import FollowItems from './FollowItems';
import FollowItemsProjects from './FollowItemsProjects';
import AccountDetails from '../login/AccountDetails';
import JobSavedApplied from '../project/JobSavedApplied';
import '../../styles/follow.css'



const FollowGlobal = () => {
  

  const [tab, setTab] = useState(1)
  const [classnameSet1, setClassnameSet1] = useState('tabTitle tabSelected')
  const [classnameSet2, setClassnameSet2] = useState('tabTitle')

  const handleClick1 = () => {
    setClassnameSet1('tabTitle tabSelected')
    setClassnameSet2('tabTitle')
    setTab(1)
  }

  const handleClick2 = () => {
    setClassnameSet1('tabTitle')
    setClassnameSet2('tabTitle tabSelected')
    setTab(2)
  }


  return (
    <>
      <div className='tabs'>
        <div className='tab'>
          <h3 onClick={handleClick1} className={classnameSet1}>Emplois sauvegardés</h3>
        </div>
        <div className='tab'>
          <h3 onClick={handleClick2} className={classnameSet2}>Commerces suivis</h3>
        </div>
      </div>

        <div className='tabItems'>
        {tab === 1 &&
          <JobSavedApplied />
        } 

        {tab === 2 &&
          <FollowItems />
        } 

        </div>
    </>
  )
}

export default FollowGlobal

