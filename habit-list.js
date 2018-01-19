import React, { Fragment } from 'react'
import * as R from 'ramda'
import EditableInline from 'react-editable-inline'

const HabitList = ({ items, onDelete, onChange }) => (
  <ul>
    {R.map(({ item, id }) => (
      <li key={id}>
        <EditableInline
          render={({ isEditing, startEditing, finishEditing, inputProps }) =>
            isEditing ? (
              <Fragment>
                <input
                  onBlur={() => finishEditing(inputProps.value)}
                  {...inputProps}
                />
                <button
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => onDelete(id)}
                >
                  X
                </button>
              </Fragment>
            ) : (
              <span
                onClick={() => startEditing()}
                onFocus={() => startEditing()}
              >
                {item.trim() === '' ? 'PUT SHIT HERE' : item}
              </span>
            )
          }
          onChange={newItem => onChange(newItem, id)}
          value={item}
        />
      </li>
    ))(items)}
  </ul>
)

export default HabitList
