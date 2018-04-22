import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: k,
    name: `item-${k}`,
    content: `item ${k}`,
    createdAt: '2018'
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
      todos: []
    };
    this.deleteItem = this.deleteItem.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this);
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
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const todos = reorder(
      this.state.todos,
      result.source.index,
      result.destination.index
    );

    this.setState({
      todos
    });
  }
  addItem(name, createdAt) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const todo = {name: name, createdAt: createdAt}
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
  deleteItem(e) {
    const id = e.target.value
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const method = 'DELETE'
    fetch(`http://localhost:3000/todos/${id}.json`, {
      headers: headers,
      method: method
    }).then(response => response.json())
      .then(data => {
        const deletedId = data.id
        this.setState({todos: this.state.todos.filter(d => d.id != deletedId)})
      })
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <div>
        <h1>DnD Todo</h1>
        <TodoForm add={(name, createdAt) => this.addItem(name, createdAt)} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                >
                {this.state.todos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        >
                        <div>{item.id}</div>
                        <div>{item.name}</div>
                        <div>{item.createdAt}</div>
                        <div><button value={item.id} onClick={this.deleteItem}>delete</button></div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
