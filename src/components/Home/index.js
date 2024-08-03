import { Component } from "react";
//import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Cookies from "js-cookie";
import Header from "../Header";

import Footer from "../Footer";

import "./index.css";

class Home extends Component {
  state = { description: "", status: "", todoList: [], statusMessage: "" };

  onChnageDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  onChnageStatus = (event) => {
    this.setState({ status: event.target.value });
  };

  onSubmitSuccess = () => {
    this.setState({ statusMessage: "Todo Created at dataBase" });
  };

  onSubmitFailure = () => {
    this.setState({ statusMessage: "Failed to Load Todo" });
  };

  //Creating Todo Database.

  addTodo = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const userId = localStorage.getItem("user_id");
    const { description, status } = this.state;
    const todoDetails = { userId, description, status, jwtToken };
    const url = "http://localhost:4002/todos";
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4002",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(todoDetails),
    };
    console.log(todoDetails);
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
      this.onSubmitSuccess();
    } else {
      this.onSubmitFailure();
    }
  };

  // Fetching all Todos from the database

  onFetchTodo = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const userId = localStorage.getItem("user_id");
    const todoDetails = { userId };
    const url = `http://localhost:4002/todos`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Access-Control-Allow-Origin": "http://localhost:4002",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
        id: `${userId}`,
      },
    };
    console.log(todoDetails);
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
    } else {
      this.onSubmitFailure();
    }
  };

  // Updating Todos
  onUpdateTodo = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const userId = localStorage.getItem("user_id");
    const todoDetails = { userId };
    const url = `http://localhost:4002/${userId}`;
    const options = {
      method: "UPDATE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Access-Control-Allow-Origin": "http://localhost:4002",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(todoDetails),
    };
    console.log(todoDetails);
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
      this.getAllTodos();
    } else {
      this.onSubmitFailure();
    }
  };

  // Deleting Todo item from the dataBase

  onDeleteTodo = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const userId = localStorage.getItem("user_id");
    const todoDetails = { userId };
    const url = `http://localhost:4002/${userId}`;
    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Access-Control-Allow-Origin": "http://localhost:4002",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(todoDetails),
    };
    console.log(todoDetails);
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
      this.getAllTodos();
    } else {
      this.onSubmitFailure();
    }
  };

  render() {
    const { status, description, todoList } = this.state;
    const time = new Date();
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-body-container">
            <h1 className="todo-heading">Todo List</h1>
            <label htmlFor="description" className="des-label">
              Description
            </label>
            <textarea
              id="description"
              className="description-text"
              placeholder="Enter details here"
              onChange={this.onChnageDescription}
              value={description}
            ></textarea>
            <label htmlFor="input">Status</label>
            <input
              type="text"
              id="input"
              className="status-input"
              onChange={this.onChnageStatus}
              value={status}
              placeholder="Enter Status"
            />
            <button className="add-button" onClick={this.addTodo}>
              Add Todo
            </button>
          </div>
          <button className="get-button" onClick={this.onFetchTodo}>
            Get Todo
          </button>
          <ul className="todo-list-container">
            {todoList.map((eachItem) => (
              <li className="todo-list-item" key={eachItem.id}>
                <span className="ds-span">{eachItem.description}</span>{" "}
                <span className="time">{time}</span>{" "}
                <span className="stt-span">{eachItem.status}</span>
                <span>
                  <CiEdit onClick={this.onUpdateTodo} className="edit" />
                </span>{" "}
                <span>
                  <MdDelete onClick={this.onDeleteTodo} className="delete" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    );
  }
}
export default Home;
