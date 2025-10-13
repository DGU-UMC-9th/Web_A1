import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {useTodo} from '../context/TodoContext';


const Todo = () => {
    const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();
    
    return (
        <div className = 'todo-container'>
            {/* Todo List 제목 */}
            <h1 className = 'todo-container__header'>
                SWAN TODO
            </h1>
            <TodoForm /> {/* 할 일 입력, 할 일 추가 관련 */}


            <div className = 'render-container'>
                {/* 좌측 컨테이너 */}
                <TodoList
                    title = '할 일'
                    todos = { todos }
                    buttonLabel = '완료'
                    buttonColor = '#28a745'
                    onClick = {completeTodo}
                />
                {/* 우측 컨테이너 */}
                <TodoList
                    title = '완료'
                    todos = { doneTodos }
                    buttonLabel = '삭제'
                    buttonColor = '#dc3545'
                    onClick = {deleteTodo}
                />                
            </div>
        </div>
    );

};


export default Todo;