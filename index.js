import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import * as R from 'ramda'
import fetch from 'isomorphic-unfetch'

import NewHabitForm from './new-habit-form'
import HabitList from './habit-list'

class App extends React.Component {
  state = { items: [] }

  componentDidMount () {
    fetch('/api/').then(response => {
      response.json().then(items => this.setState({ items }))
    })
  }

  render () {
    return (
      <Fragment>
        <NewHabitForm
          onSave={value => {
            this.setState(({ items }) => ({
              items: [...items, value]
            }))
          }}
        />
        <HabitList
          items={this.state.items}
          onDelete={index => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.setState(({ items }) => ({
                items: R.addIndex(R.filter)((items, idx) => idx !== index)(
                  items
                )
              }))
            }
          }}
          onChange={(item, index) => {
            this.setState(({ items }) => ({
              items: R.update(index, item, items)
            }))
          }}
        />
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
