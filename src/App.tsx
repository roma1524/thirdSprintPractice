import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: {
        data: TasksType[]
        filter: FilterValuesType
    }
}

function App() {

   /* const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'}
    ]);


    const [tasks, setTasks] = useState<TasksObjPropsType>({
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Onion', isDone: false}
        ],
    })*/

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });

    const removeTodolist = (payload: { todolistId: string }) => {
        setTodolists(todolists.filter(el => el.id !== payload.todolistId))
        delete tasks[payload.todolistId]
        setTasks({...tasks})
    }

    function removeTask(payload: { todolistId: string, taskId: string }) {
        setTasks({
            ...tasks,
            [payload.todolistId]: {
                ...tasks[payload.todolistId],
                data: tasks[payload.todolistId].data.filter(el => el.id !== payload.taskId)
            }
        })
    }

    function addTask(payload: { todolistId: string, title: string }) {

        const newItem = {id: v1(), title: payload.title, isDone: false}

        setTasks({
            ...tasks,
            [payload.todolistId]: {...tasks[payload.todolistId], data: [...tasks[payload.todolistId].data, newItem]}
        })
    }

    function changeStatus(payload: { todolistId: string, taskId: string, newIsDone: boolean }) {
        setTasks({...tasks, [payload.todolistId]: {...tasks[payload.todolistId], data: tasks[payload.todolistId].data.map(el => el.id === payload.taskId ? {...el, isDone: payload.newIsDone} : el)}})
    }

    function changeFilter(payload: {todolistId: string, filter: FilterValuesType}) {
        setTasks({...tasks, [payload.todolistId]: {...tasks[payload.todolistId], filter: payload.filter}})
    }

    return (
        <div className="App">
            {todolists.map((el) => {
                let tasksForTodolist = tasks[el.id].data;
                if (tasks[el.id].filter === "active") {
                    tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === false);
                }
                if (tasks[el.id].filter === "completed") {
                    tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === true);
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
                        filter={tasks[el.id].filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
