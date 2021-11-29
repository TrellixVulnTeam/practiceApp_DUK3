import {
    Button,
    Radio
} from "antd";
import { getAllStudents } from "./client";
import './App.css';

function App() {
    getAllStudents()
        .then(res => res.json())
        .then(console.log)
  return "hello react";
}

export default App;
