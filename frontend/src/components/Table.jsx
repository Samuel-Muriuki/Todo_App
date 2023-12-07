import React, { useState } from 'react'
import axios from 'axios'
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const Table = ({ todos, setTodos, isLoading }) => {

    const [editText, setEditText] = useState({
        'body': ''
    })

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            const newList = todos.filter(todo => todo.id !== id)
            setTodos(newList)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (id, value) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
            const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
            setTodos(newTodos)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckbox = (id, value) => {
        handleEdit(id, {
            'completed': !value
        })
    }

    const handleChange = (e) => {
        setEditText( prev => ({
            ...prev,
            'body': e.target.value
        }))
    }

    const handleClick = () => {
        handleEdit(editText.id, editText)
    }

    return (
        <div className='py-2'>
            <table className='w-11/12 max-w-4x1'>
                <thead className='border-b-2 border-black'>
                    <tr>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>To Do</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Data Created</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div>Is Loading</div> :
                        <>
                            {todos.map((todoItem, index) => {
                                return (
                                    <tr key={todoItem.id} className='border-b border-black'>
                                        <td className='p-3 text-sm' title={todoItem.id}>
                                            <span onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                                                className='inline-block cursor-pointer'>{todoItem.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}</span>
                                        </td>
                                        <td className='p-3 text-sm'>{todoItem.body}</td>
                                        <td className='p-3 text-sm text-center'>
                                            <span className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? "bg-green-300" : "bg-red-300"}`}>
                                                {todoItem.completed ? 'Done' : 'Incomplete'}
                                            </span>
                                        </td>
                                        <td className='p-3 text-sm'>{new Date(todoItem.created).toLocaleString()}</td>
                                        <td className='p-3 text-lg font-medium grid grid-flow-col items-center'>
                                            <span className='text-x1 cursor-pointer'>
                                                <button className="btn text-lg bg-blue-300" onClick={() => document.getElementById('my_modal_1').showModal()}><MdEditNote onClick={() => setEditText(todoItem)} /></button>
                                            </span>
                                            <span className='text-x1 cursor-pointer text-red-500'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></span>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </>
                    }
                </tbody>
            </table>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Todo</h3>
                    <input type="text" placeholder="Type here" value={editText.body} onChange={handleChange} className="input input-bordered mt-8" />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-primary mr-4" onClick={handleClick}>Edit</button>
                            <button className="btn btn-warning">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>

    )
}

export default Table