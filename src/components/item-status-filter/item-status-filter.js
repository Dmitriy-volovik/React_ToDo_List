import React, { Component } from "react";

// import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  selected = "btn-info";
  notSelected = "btn-outline-secondary";
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" }
  ];
  state = {
    style: "all"
  };

  applyStyleForButton = name => {
    switch (name) {
      case "all":
        this.props.showAllItems();
        this.setState({
          style: name
        });
        break;
      case "active":
        this.props.showActiveItems();
        this.setState({
          style: name
        });
        break;
      case "done":
        this.props.showDoneItem();
        this.setState({
          style: name
        });
        break;
      default:
        this.props.showAllItems();
        break;
    }
  };

  render() {
    const buttons = this.buttons.map(({ name, label }) => {
      return (
        <button
          type="button"
          className={`btn ${
            this.state.style === name ? this.selected : this.notSelected
          }`}
          onClick={() => this.applyStyleForButton(name)}
        >
          {label}
        </button>
      );
    });
    return <div className="btn-group">{buttons}</div>;
  }
}
