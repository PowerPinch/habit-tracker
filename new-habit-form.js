import React, { Component } from 'react'
import { trim } from 'lodash/fp'

export default class NewHabitForm extends Component {
  state = { value: '' }

  render () {
    return (
      <div>
        <input
          type="text"
          placeholder="Name your shit"
          value={this.state.value}
          onChange={this.setName}
        />
        <button onClick={this.saveHabit}>Submit new shit</button>
      </div>
    )
  }

  setName = e => {
    this.setState({ value: e.target.value })
  }
  saveHabit = () => {
    const trimValue = trim(this.state.value)
    if (trimValue) {
      this.props.onSave && this.props.onSave(trimValue)
      this.setState({ value: '' })
    }
  }
}
