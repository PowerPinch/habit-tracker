import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-unfetch'

import NewHabitForm from './new-habit-form'
import HabitList from './habit-list'

class App extends React.Component {
  state = { items: [] }
  refreshItems () {
    return fetch('/api/').then(response =>
      response.json().then(items => this.setState({ items }))
    )
  }
  componentDidMount () {
    this.refreshItems().catch(e => console.error(e))
  }

  render () {
    return (
      <Fragment>
        <NewHabitForm
          onSave={value => {
            fetch('/api/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ item: value })
            })
              .then(() => this.refreshItems())
              .catch(e => console.error(e))
          }}
        />
        <HabitList
          items={this.state.items}
          onDelete={id => {
            if (window.confirm('Are you sure you want to delete?')) {
              fetch(`/api/${id}`, {
                method: 'DELETE'
              })
                .then(() => this.refreshItems())
                .catch(e => console.error(e))
            }
          }}
          onChange={(item, id) => {
            fetch(`/api/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ item })
            })
              .then(() => this.refreshItems())
              .catch(e => console.error(e))
          }}
        />
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
