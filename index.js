import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

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
        <HabitList items={this.state.items} />
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
