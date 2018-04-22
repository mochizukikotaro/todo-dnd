import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const id = this.props.todo.id
    const name = this.props.todo.name
    const createdAt = this.props.todo.createdAt
    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{createdAt}</td>
        <td><button>削除する</button></td>
      </tr>
    )
  }
}
TodoItem.propTypes = {
  todo: PropTypes.object
}
