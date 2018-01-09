import React, { Fragment } from 'react'
import * as R from 'ramda'
import EditableInline from 'react-editable-inline'

const HabitList = ({ items, onDelete, onChange }) => (
  <ul>
    {R.addIndex(R.map)((item, index) => (
      <li key={index + item}>
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
                  onClick={() => onDelete(index)}
                >
                  X
                </button>
              </Fragment>
            ) : (
              <span
                onClick={() => startEditing()}
                onFocus={() => startEditing()}
              >
                {item}
              </span>
            )
          }
          onChange={newItem => onChange(newItem, index)}
          value={item}
        />
      </li>
    ))(items)}
  </ul>
)

export default HabitList
