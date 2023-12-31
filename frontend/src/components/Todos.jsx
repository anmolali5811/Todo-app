import React, { useContext, useRef, useState } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import AuthContext from '../context/AuthContext';
import TodosContext from '../context/TodosContext';

function Todos({ todo:t }) {

    const [edit, setEdit] = useState(false);
    const [todo, setTodo] = useState("");

    const input = useRef("");

    const { dispatch } = useContext(TodosContext);

    const { user } = useContext(AuthContext);

    const deleteTodo = async () => {
        const response = await fetch("https://todo-node-hii2.onrender.com/api/todos/"+ t._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error)
        }

        if (response.ok) {
            dispatch({type: "DELETE_TODO", payload: json});
        }
    }

    const handleDone = async () => {
        const response = await fetch("https://todo-node-hii2.onrender.com/api/todos/" + t._id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({completed: !t.completed})
        });

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error);
        }

        if (response.ok) {
            dispatch({type: "COMPLETE_TODO", payload: json, completed: !t.completed});
        }
    }
    const handleActive = async () => {
        const response = await fetch("https://todo-node-hii2.onrender.com/api/todos/" + t._id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({active: !t.active})
        });

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error);
        }

        if (response.ok) {
            dispatch({type: "ACTIVE_TODO", payload: json, active: !t.active});
        }
    }

    const editTodo = async () => {
       const response = await fetch("https://todo-node-hii2.onrender.com/api/todos/"+ t._id, {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
       });
       const json = await response.json();

       if (!response.ok) {
        console.log(json.error)
       }

       if (response.ok) {
            setEdit(true);
            setTodo(json.todo);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://todo-node-hii2.onrender.com/api/todos/" + t._id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({todo})
        });

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error);
        }

        if (response.ok) {
            setEdit(false);
            dispatch({type: "UPDATE_TODO", payload: json, newTodo: todo});
        }
    }
    
    return (
        <div className='parent-todo'>
            { edit ? <form onSubmit={handleSubmit}>
                        <input ref={input} type="text" value={todo} onChange={e => setTodo(e.target.value)} />
                        <button>Done</button>
                    </form>
            
            : <div className={`todo-container ${t.active ? 'active' : ''}`}>
                <div className='todos'>
                    <p className={t.completed ? 'line' : ''}>{t.todo}</p>
                    <div>
                        <AiFillEdit size={25} cursor="pointer" title='Edit' onClick={editTodo} />
                        <AiFillDelete onClick={deleteTodo} size={25} cursor="pointer" title='Delete' />
                        <GiProgression onClick={handleActive} size={25} cursor="pointer" title='Active' />
                        <MdOutlineDownloadDone onClick={handleDone} size={25} cursor="pointer" title='Done' />
                    </div>
                </div>
                <span>{t.createdAt}</span>
            </div> }
        </div>
    );
}

export default Todos;