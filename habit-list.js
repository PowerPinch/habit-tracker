import React, { Fragment } from 'react'
import * as R from 'ramda'
import EditableInline from 'react-editable-inline'
import styled from 'styled-components'

import { Button, Input } from './utils'

const HabitItem = styled.li`
  display: flex;
  list-style-type: none;
  margin-left: 0.75rem;
  border: 0.1rem solid black;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  box-shadow: 0 0 0.25rem gray;
`
const HabitItemList = styled.ul`
  display: flex;
  width: 100vw;
`
const HabitItemText = styled.span`
  white-space: nowrap;
  cursor: pointer;
`
const HabitList = ({ items, onDelete, onChange }) => (
  <HabitItemList>
    {R.map(({ item, id }) => (
      <HabitItem key={id}>
        <EditableInline
          render={({
            isEditing,
            startEditing,
            finishEditing,
            inputProps: { ref, onChange, value }
          }) =>
            isEditing ? (
              <Fragment>
                <Input
                  onBlur={() => finishEditing(value)}
                  innerRef={ref}
                  onChange={onChange}
                  value={value}
                />
                <Button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => onDelete(id)}
                >
                  X
                </Button>
              </Fragment>
            ) : (
              <HabitItemText
                onClick={() => startEditing()}
                onFocus={() => startEditing()}
              >
                {item.trim() === '' ? 'PUT SHIT HERE' : item}
              </HabitItemText>
            )
          }
          onChange={newItem => onChange(newItem, id)}
          value={item}
        />
      </HabitItem>
    ))(items)}
  </HabitItemList>
)

export default HabitList
