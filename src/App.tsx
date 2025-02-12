import {useState} from 'react';
// @ts-ignore
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {CreateItemForm} from "@/CreateItemForm.tsx";

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todoLists, setTodoLists] = useState<TodolistsType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]);
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Onion', isDone: false}
        ],
    })

    const removeTodolist = (payload: { todolistId: string }) => {
        setTodoLists(todoLists.filter(el => el.id !== payload.todolistId))
        delete tasks[payload.todolistId]
        setTasks({...tasks})
    }
    function removeTask(payload: { todolistId: string, taskId: string }) {
        setTasks({
            ...tasks,
            [payload.todolistId]: tasks[payload.todolistId].filter(el => el.id !== payload.taskId)
        })
    }
    function addTask(payload: { todolistId: string, title: string }) {

        const newItem = {id: v1(), title: payload.title, isDone: false}

        setTasks({
            ...tasks,
            [payload.todolistId]: [...tasks[payload.todolistId], newItem]
        })
    }
    function changeStatus(payload: { todolistId: string, taskId: string, newIsDone: boolean }) {
        setTasks({...tasks, [payload.todolistId]: tasks[payload.todolistId].map(el => el.id === payload.taskId ? {...el, isDone: payload.newIsDone} : el)})
    }
    function changeFilter(payload: {todolistId: string, filter: FilterValuesType}) {
        setTodoLists(todoLists.map(el => el.id === payload.todolistId ? {...el, filter: payload.filter} : el))
    }

    function changeTodolistTitle  (payload :{title: string, todolistId: string})  {
        setTodoLists(todoLists.map(el => el.id === payload.todolistId ? {...el, title: payload.title} : el))
    }

    function changeTaskTitle  (payload :{todolistId: string, title: string, taskId: string})  {
        setTasks({...tasks,  [payload.todolistId]: tasks[payload.todolistId].map(el => el.id === payload.taskId ? {...el, title: payload.title} : el)})
    }

    function createTodolistItem (title: string) {
        let newTodolistId = v1();
        const newTodolist : TodolistsType = {id: newTodolistId, title, filter: 'All'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    return (
        <div className="App">

            <div>
                <CreateItemForm createItem={createTodolistItem}/>
            </div>

            {todoLists.map((el) => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "Active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "Completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                )
            })}


        </div>
    );
}

export default App;
