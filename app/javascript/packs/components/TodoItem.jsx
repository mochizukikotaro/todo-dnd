import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = (props) => {
  const id = props.todo.id
  const name = props.todo.name
  const createdAt = props.todo.createdAt
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{createdAt}</td>
      <td><button>削除する</button></td>
    </tr>
  )
}
TodoItem.propTypes = {
  todo: PropTypes.object
}

export default TodoItem
