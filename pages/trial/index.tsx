import React from 'react'
import style from 'styled-components';
import { NewDashboard } from '../../containers/NewDashboard/NewDashboard.container';

const Wrapper = style.div`
    display: flex;
    flex-direction: column;
`

const Title = style.h1`
    font-size: 20px;
    color: white;
`

const Trial = () => {
  return (
    <Wrapper>
      <h1>New Chart Trial</h1>
      <NewDashboard />
    </Wrapper>
  )
}
export default Trial
