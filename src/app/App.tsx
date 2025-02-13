// @ts-ignore
import './App.css';
import {Todolist} from '../Todolist.tsx';
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {tasksSelect} from "@/model/tasks-selectors.ts";
import {todolistsSelect} from "@/model/todolists-selectors.ts";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "@/model/tasks-reducer.ts";
import {
    changeFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistsType
} from "@/model/todolists-reducer.ts";

function App() {

    const tasks = useAppSelector(tasksSelect)
    const todolists = useAppSelector(todolistsSelect)

    const dispatch = useAppDispatch()

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC({todolistId: todolistId}))
    }
    function addTodolist (title: string) {
        dispatch(createTodolistAC(title))
    }
    function changeFilter(payload: {todolistId: string, filter: FilterValuesType}) {
      dispatch(changeFilterAC({todolistId: payload.todolistId, filter: payload.filter}))
    }
    function changeTodolistTitle  (payload :{title: string, todolistId: string})  {
        dispatch(changeTodolistTitleAC({todolistId: payload.todolistId, title: payload.title}))
    }

    function removeTask(payload: { todolistId: string, taskId: string }) {
        dispatch(removeTaskAC({todolistId: payload.todolistId, taskId: payload.taskId}))
    }
    function addTask(payload: { todolistId: string, title: string }) {
        dispatch(addTaskAC({todolistId: payload.todolistId, title: payload.title}))
    }
    function changeStatus(payload: { todolistId: string, taskId: string, newIsDone: boolean }) {
        dispatch(changeStatusAC({todolistId: payload.todolistId, taskId: payload.taskId, newIsDone: payload.newIsDone}))
    }
    function changeTaskTitle  (payload :{todolistId: string, title: string, taskId: string})  {
        dispatch(changeTaskTitleAC({todolistId: payload.todolistId, taskId: payload.taskId, title: payload.title}))
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
