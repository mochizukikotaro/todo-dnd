import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Todo</th>
          <th>Created at</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {props.todos.map((todo) =>
          <TodoItem todo={todo} key={todo.name + todo.createdAt} />
        )}
      </tbody>
    </table>
  )
}
TodoList.propTypes = {
  todos: PropTypes.array
}


export default TodoList
