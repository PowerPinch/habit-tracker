import React, { Component } from 'react'
import { trim } from 'lodash/fp'

import { Button, Input } from './utils'
export default class NewHabitForm extends Component {
  state = { value: '' }

  render () {
    return (
      <div>
        <Input
          type="text"
          placeholder="Name your shit"
          value={this.state.value}
          onChange={this.setName}
        />
        <Button onClick={this.saveHabit}>Submit new shit</Button>
      </div>
    )
  }

  setName = ({ target: { value } }) => {
    this.setState({ value })
  }
  saveHabit = () => {
    const trimValue = trim(this.state.value)
    if (trimValue) {
      this.props.onSave && this.props.onSave(trimValue)
      this.setState({ value: '' })
    }
  }
}
