import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-unfetch'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { normalize } from 'polished'

import NewHabitForm from './new-habit-form'
import HabitList from './habit-list'
import theme from './theme'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,900|Raleway:300,400');

  ${normalize()}

  #root {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-family: 'Raleway', sans-serif;
    min-height: 100vh;
    min-width: 100vw;

  }
`
const TitleBar = styled.header`
  font-family: ${props => props.theme.displayFont};
  font-weight: 900;
  font-size: 2rem;
  padding: ${props => props.theme.bigPad};
`
const Container = styled.div`
  border: ${props => props.theme.thinBorder};
  padding: ${props => props.theme.bigPad};
  max-width: 90vw;
  min-width: 40rem;
  overflow-x: scroll;
`
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
      <ThemeProvider theme={theme}>
        <Fragment>
          <TitleBar> TRACK YOUR SHIT </TitleBar>
          <Container>
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
          </Container>
        </Fragment>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
