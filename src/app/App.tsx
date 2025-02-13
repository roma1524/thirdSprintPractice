// @ts-ignore
import './App.css';
import {Todolist} from '../Todolist.tsx';
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {tasksSelect} from "@/model/tasks-selectors.ts";
import {todolistsSelect} from "@/model/todolists-selectors.ts";
import {removeTaskAC, TasksType} from "@/model/tasks-reducer.ts";
import {createTodolistAC, TodolistsType} from "@/model/todolists-reducer.ts";





function App() {

    const tasks = useAppSelector(tasksSelect)
    const todolists = useAppSelector(todolistsSelect)

    const dispatch = useAppDispatch()

    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // const [todoLists, setTodoLists] = useState<TodolistsType[]>([
    //     {id: todolistId1, title: 'What to learn', filter: 'All'},
    //     {id: todolistId2, title: 'What to buy', filter: 'All'}
    // ]);
    // const [tasks, setTasks] = useState<TasksStateType>({
    //     [todolistId1]: [
    //         {id: v1(), title: 'CSS', isDone: false},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'Redux', isDone: false}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'Milk', isDone: false},
    //         {id: v1(), title: 'Beer', isDone: false},
    //         {id: v1(), title: 'Onion', isDone: false}
    //     ],
    // })

    const removeTodolist = (payload: { todolistId: string }) => {
        // setTodoLists(todoLists.filter(el => el.id !== payload.todolistId))
        // delete tasks[payload.todolistId]
        // setTasks({...tasks})
    }
    function addTodolist (title: string) {
        dispatch(createTodolistAC(title))
    }
    function changeFilter(payload: {todolistId: string, filter: string}) {
        // setTodoLists(todoLists.map(el => el.id === payload.todolistId ? {...el, filter: payload.filter} : el))
    }
    function changeTodolistTitle  (payload :{title: string, todolistId: string})  {
        // setTodoLists(todoLists.map(el => el.id === payload.todolistId ? {...el, title: payload.title} : el))
    }

    function removeTask(payload: { todolistId: string, taskId: string }) {
        dispatch(removeTaskAC( payload.todolistId, payload.taskId ))
    }
    function addTask(payload: { todolistId: string, title: string }) {
        // const newItem = {id: v1(), title: payload.title, isDone: false}
        //
        // setTasks({
        //     ...tasks,
        //     [payload.todolistId]: [...tasks[payload.todolistId], newItem]
        // })
    }
    function changeStatus(payload: { todolistId: string, taskId: string, newIsDone: boolean }) {
        // setTasks({...tasks, [payload.todolistId]: tasks[payload.todolistId].map(el => el.id === payload.taskId ? {...el, isDone: payload.newIsDone} : el)})
    }
    function changeTaskTitle  (payload :{todolistId: string, title: string, taskId: string})  {
        // setTasks({...tasks,  [payload.todolistId]: tasks[payload.todolistId].map(el => el.id === payload.taskId ? {...el, title: payload.title} : el)})
    }


    return (
        <div className="App">

            <div>
                <CreateItemForm createItem={addTodolist}/>
            </div>

            {todolists.map((el: TodolistsType) => {
                let tasksForTodolist: TasksType = tasks[el.id];
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
