import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {todos: []}
  }
  componentDidMount() {
    fetch("http://localhost:3000/todos.json")
      .then(response => response.json())
      .then(data => {
        this.setState({
          todos: data.map(d => ({
            id: d.id,
            name: d.name,
            createdAt: d.created_at
          }))
        })
      })
  }
  addItem(name, createdAt) {
    const todo = {name: name, createdAt: createdAt}
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const method = 'POST'
    const body = JSON.stringify(todo)
    fetch("http://localhost:3000/todos.json", {
      headers: headers,
      method: method,
      body: body
    }).then(response => response.json())
      .then(data => {
        this.setState({todos: this.state.todos.concat(todo)})
      })
  }
  removeItem(id) {

  }
  render() {
    return (
      <div>
        <h1>TodoApp</h1>
        <TodoForm add={(name, createdAt) => this.addItem(name, createdAt)} />
        <TodoList todos={this.state.todos} />
      </div>
    )
  }
}
