import React, { useState, FormEvent } from 'react'
import { type TTodo } from './type/todo';

const Todo = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');

    // 할 일 추가
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        const text = input.trim();

        if (text) {
            const newTodo: TTodo = { id: Date.now(), text };
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            setInput('');
        }
    };

    // 완료 처리
    const completeTodo = (todo: TTodo): void => {
        setTodos(prevTodos => prevTodos.filter((t) => t.id !== todo.id));
        setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    };

    // 삭제 처리
    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos(prevDoneTodos => prevDoneTodos.filter((t) => t.id !== todo.id));
    };

    return (
        <div className='todo-container'>
            <h1 className='todo-container-header'> Jye Todo </h1>
            
            {/* 입력창 */}
            <form onSubmit={handleSubmit} className='todo-container_form'> 
                <input
                    type='text'
                    className='todo-container_input' 
                    placeholder='할 일 입력'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required
                />
                <button type='submit' className='todo-container_button'>
                    할 일 추가
                </button> 
            </form>     

            <div className='render-container'>
                {/* 할 일 */}
                <div className='render-container_section'>
                    <h2 className='render-container-title'> 할 일 </h2>
                    <ul id='todo-list' className='render-container_list'>
                        {todos.map((todo) => (
                            <li key={todo.id} className='render-container_item'>
                                <span className='render-container_item-text'>
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => completeTodo(todo)}
                                    style={{ backgroundColor: '#28a745' }}
                                    className='render-container_item-button'
                                >
                                    완료
                                </button>
                            </li>
                        ))}
                    </ul>                 
                </div>

                {/* 완료 */}
                <div className='render-container_section'>
                    <h2 className='render-container-title'> 완료 </h2>
                    <ul id='done-list' className='render-container_list'>
                        {doneTodos.map((todo) => (
                            <li key={todo.id} className='render-container_item'>
                                <span className='render-container_item-text'>
                                    {todo.text}
                                </span>
                                <button
                                    onClick={() => deleteTodo(todo)}
                                    style={{ backgroundColor: '#dc3545' }}
                                    className='render-container_item-button'
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Todo
