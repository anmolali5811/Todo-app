import React, { useEffect } from 'react';
import { useContext } from 'react';
import Input from '../components/Input';
import Todos from '../components/Todos';
import AuthContext from '../context/AuthContext';
import TodosContext from '../context/TodosContext';

function Home() {

    const {todos, dispatch} = useContext(TodosContext);
    const { dispatch: Authdispatch, user } = useContext(AuthContext);

    useEffect(() => {

        const fetchTodos = async () => {
            const response = await fetch("http://localhost:5000/api/todos", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            dispatch({type: "FETCH_TODOS", payload: json});
        }

        fetchTodos();
        
    }, [dispatch]);

    const handleClick = () => {
        localStorage.removeItem("user");
        Authdispatch({type: "LOGOUT"});
        dispatch({type: "FETCH_TODOS"})
    }
    const handleCompleted = () => {
        dispatch({type: "FILTER_BY_COMPLETED_STATUS"})
    }
    const handleActive = () => {
        dispatch({type: "FILTER_BY_ACTIVE_STATUS"})
    }

    return (
        <div className='home'>
            <div>
                <p>Welcome, <span>{ user.userName }</span>.</p>
                <button onClick={handleClick}>Logout</button>
            </div>
            <h2>Todo app</h2>
            <button className='button' onClick={handleCompleted}>Filter By Completed</button>
            <button className='button' onClick={handleActive}>Filter By Active</button>
            <Input />
            {
                todos && todos.map(todo => (
                    <Todos key={todo._id} todo={todo} />
                ))
            }
        </div>
    );
}

export default Home;