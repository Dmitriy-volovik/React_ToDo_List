import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

let maxID = 100;

export default class App extends Component {
  state = {
    todoData: [
      this.createTodoItem("Drink Milk"),
      this.createTodoItem("Make awesome WEB"),
      this.createTodoItem("What are you doing?")
    ],
    showDoneItem: false,
    showActiveItem: false,
    filterText: ""
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: maxID++
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(el => el.id !== id);
      return {
        todoData: newTodoData
      };
    });
  };

  addItem = itemText => {
    const newItem = this.createTodoItem(itemText);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem]
    }));
    console.log("add");
  };

  toggleProperty(arr, id, pronName) {
    const idx = arr.findIndex(el => el.id === id);
    //1. Update obj
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [pronName]: !oldItem[pronName] };

    //2. Construct new array
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };
  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  onSort = e => {
    this.setState({
      filterText: e.target.value
    });
  };

  showAllItems = () => {
    this.setState({
      showActiveItem: false,
      showDoneItem: false
    });
  };
  showActiveItems = () => {
    this.setState({
      showActiveItem: true,
      showDoneItem: false
    });
  };
  showDoneItems = () => {
    this.setState({
      showDoneItem: true,
      showActiveItem: false
    });
  };

  render() {
    let { todoData, showDoneItem, showActiveItem } = this.state;
    todoData = showDoneItem ? todoData.filter(item => item.done) : todoData;
    todoData = showActiveItem ? todoData.filter(item => !item.done) : todoData;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSort={this.onSort} />
          <ItemStatusFilter
            showDoneItem={this.showDoneItems}
            showActiveItems={this.showActiveItems}
            showAllItems={this.showAllItems}
          />
        </div>

        <TodoList
          todos={todoData.filter(item =>
            item.label.toLowerCase().includes(this.state.filterText)
          )}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onAdd={this.addItem} />
      </div>
    );
  }
}
