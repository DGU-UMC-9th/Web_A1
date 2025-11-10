import { useState, type FormEvent } from "react"
import type { TTodo } from "../types/todo"

const Todo = () => {
    const[todos, setTodos] = useState<TTodo[]>([]);
    const[donetodos, setDoneTodos] = useState<TTodo[]>([]);
    const[input, setInput] = useState<string>('');

    const handleSubmit = (e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();
        const text = input.trim();

        if(text){
            const newTodo : TTodo = {id:Date.now(), text};
            setTodos((prevTodos):TTodo[] => [...prevTodos, newTodo]);
            setInput('');
        }
    };

    const CompleteTodo = (todo:TTodo):void =>{
        setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
        setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo:TTodo):void =>{
        setDoneTodos((prevDoneTodos): TTodo[] =>
            prevDoneTodos.filter((t):boolean => t.id !== todo.id)
        );
    }
    return(
        <div className='todo-container'>
            <h1 className='todo-container__header'>Todo</h1>
            <form onSubmit={handleSubmit} className='todo-container__form'>
                <input
                    value={input}
                    onChange={(e):void => setInput(e.target.value)}
                    type='text' 
                    className='todo-container__input'
                    placeholder="할 일 입력"
                    required>
                </input>
                <button type="submit" className="todo-container__button">
                    할 일 추가
                </button>
            </form>
            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {
                            todos.map((todo):any=>(
                                <li key={todo.id} className="render-container__item">
                                    <p className="render-container__item-text">
                                        {todo.text}
                                    </p>
                                    <button
                                        onClick={():void => CompleteTodo(todo)}
                                        style={{
                                            backgroundColor : 'green'
                                        }}
                                        className="render-container__item-button">완료</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="render-container__section">
                <h2 className="render-container__title">완료</h2>
                <ul id="done-list" className="render-container__list">
                    {
                            donetodos.map((todo):any=>(
                                <li key={todo.id} className="render-container__item">
                                    <p className="render-container__item-text">
                                        {todo.text}
                                    </p>
                                    <button
                                        onClick={():void => deleteTodo(todo)}
                                        style={{
                                            backgroundColor : 'red'
                                        }}
                                        className="render-container__item-button">삭제</button>
                                </li>
                            ))
                        }
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Todo