import React from "react";
import TodoListItem from "../todo-list-item";

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = todos.map((item, index) => {
    const { id, ...restItemProps } = item;
    return (
      <li className="list-group-item" key={index}>
        <TodoListItem
          {...restItemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });
  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
