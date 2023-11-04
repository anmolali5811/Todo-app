import { useReducer, createContext } from "react";

const TodosContext = createContext();

const todoReducer = (state, action) => {
    switch (action.type) {
        case "CREATE_TODO":
            return {
                todos: [action.payload, ...state.todos]
            }
        case "FETCH_TODOS":
            return {
                todos: action.payload
            }

        case "DELETE_TODO":
            return {
                todos: state.todos.filter(t => t._id != action.payload._id)
            }

        case "UPDATE_TODO":
            const Uarr = state.todos.map(t => {
                if (t._id == action.payload._id) {
                    return {...t, todo: action.newTodo }
                }

                return t;
            })

            return {
                todos: Uarr
            }
        case "COMPLETE_TODO":
            const Carr = state.todos.map(t => {
                if (t._id == action.payload._id) {
                    return {...t, completed: action.completed }
                }

                return t;
            })

            return {
                todos: Carr
            }
        case "ACTIVE_TODO":
            const Aarr = state.todos.map(t => {
                if (t._id == action.payload._id) {
                    return {...t, active: action.active }
                }

                return t;
            })

            return {
                todos: Aarr
            }
        case "FILTER_BY_ACTIVE_STATUS":
            let FBASarr = state.todos;
            FBASarr.sort((a, b) => {
                return b.active - a.active
            })
            return {
                todos: FBASarr
            }

        case "FILTER_BY_COMPLETED_STATUS":
            let FBCSarr = state.todos;
            FBCSarr.sort((a, b) => {
                return b.completed - a.completed
            })
            return {
                todos: FBCSarr
            }


        default:
            return state;
    }
}


export const TodosContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(todoReducer, {
        todos: []
    });

    return (
        <TodosContext.Provider value={{...state, dispatch}}>
            { children }
        </TodosContext.Provider>
    )
}


export default TodosContext;