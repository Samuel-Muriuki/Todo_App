import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import TodoForm from './components/TodoForm'
import Table from './components/Table'

function App() {

  const [todos, setTodos] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/")
      console.log("response: ", response);
    } catch (errror) {
      console.log("error: ", errror);
    }
  }

  return (
    <div className='bg-indigo-100 px-8 min-h-screen'>
      <nav className='pt-8'> 
        <h1 className='text-5x1 text-center pb-8'>To Do List</h1>
    </nav>
    <TodoForm />
    <Table />
    </div>
  )
}

export default App
