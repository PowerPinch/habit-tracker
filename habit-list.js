import React from 'react'
import * as R from 'ramda'

const HabitList = ({ items }) => (
  <ul>
    {R.addIndex(R.map)((item, index) => <li key={index}>{item}</li>)(items)}
  </ul>
)

export default HabitList
