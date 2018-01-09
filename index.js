import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import * as R from 'ramda'

import NewHabitForm from './new-habit-form'
import HabitList from './habit-list'

class App extends React.Component {
  state = { items: [] }
  render () {
    return (
      <Fragment>
        <NewHabitForm
          onSave={value => {
            this.setState({ items: [...this.state.items, value] })
          }}
        />
        <HabitList
          items={this.state.items}
          onDelete={index => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.setState({
                items: R.addIndex(R.filter)((items, idx) => idx !== index)(
                  this.state.items
                )
              })
            }
          }}
          onChange={(item, index) => {
            this.setState({
              items: R.update(index, item, this.state.items)
            })
          }}
        />
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
