import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const TodoList = (props) => {
  return (
    <table>
      <thead>
        <tr><th>Todo</th><th>Created at</th></tr>
      </thead>
      <tbody>
        {props.todos.map((todo) =>
          <TodoItem todo={todo} key={todo.name} />
        )}
      </tbody>
    </table>
  )
}
TodoList.propTypes = {
  todos: PropTypes.array
}


export default TodoList
