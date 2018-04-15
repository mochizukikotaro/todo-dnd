import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {todos: []}
  }
  componentDidMount() {
    fetch("http://localhost:3000/todo/index.json")
      .then(response => response.json())
      .then(data => {
        this.setState({
          todos: data.map(d => ({name: d.name, createdAt: d.created_at}))
        })
      })
  }
  addTodo(name, createdAt) {
    const todo = {name: name, createdAt: createdAt}
    this.setState({todos: this.state.todos.concat(todo)})
  }
  render() {
    return (
      <div>
        <h1>TodoApp</h1>
        <TodoForm add={(name, createdAt) => this.addTodo(name, createdAt)} />
        <TodoList todos={this.state.todos} />
      </div>
    )
  }
}
