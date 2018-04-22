import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.deleteItem = this.deleteItem.bind(this) // こんなこと必要ですか？
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
        const newItem = {
          id: data.id,
          name: data.name,
          createdAt: data.created_at
        }
        this.setState({todos: this.state.todos.concat(newItem)})
      })
  }
  deleteItem(id) {
    this.setState({todos: this.state.todos.filter(d => d.id != id)})
  }
  render() {
    return (
      <div>
        <h1>TodoApp</h1>
        <TodoForm add={(name, createdAt) => this.addItem(name, createdAt)} />
        <TodoList todos={this.state.todos} deleteItem={this.deleteItem} />
      </div>
    )
  }
}
