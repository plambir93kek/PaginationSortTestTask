import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchTodos } from '../store/todoAPI';
import { decSortId, decSortText, setPages } from '../store/todoReducer';
import './styles/App.css';

const App: React.FC = () => {
    
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const { loading, pages } = useAppSelector(state => state.todos);
    const [decsendId, setDecsendId] = useState(false);
    const [decsendText, setDecsendText] = useState(false);
    const [current, setCurrent] = useState(0);
    const todos = useAppSelector(state => state.todos.todos).filter(todo =>
        todo.title.includes(searchTerm))

    const sortId = () => {
        setDecsendId(!decsendId)
    };

    const sortText = () => {
        setDecsendText(!decsendText)
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrent(0)
    }

    useEffect(() => {
        dispatch(fetchTodos())
    }, []);

    useEffect(() => {
        dispatch(decSortId(decsendId));
    }, [decsendId]);

    useEffect(() => {
        dispatch(setPages(todos.length))
    }, [searchTerm]);

    useEffect(() => {
        dispatch(decSortText(decsendText))
    }, [decsendText])

    return (
        <div className='App'>
            <div className='header'>
                <input onChange={search} placeholder='search for todo' className='search-input' type='text' />
            </div>
            {loading && 
              <div className='loader-container'>
                  <div className='loader-text'>Loading...</div>
                  <div className='loader'></div>
              </div>
            }
            {todos.length > 0 && <table className='table'>
                <tr>
                    <th onClick={sortId} className='head-id'>Id</th>
                    <th onClick={sortText} className='head-text'>Text todo</th>
                </tr>
                {todos.slice(current * 50, current * 50 + 50).map(todo =>
                    <tr>
                        <td className='todoId'>{todo.id}</td>
                        <td>{todo.title}</td>
                    </tr>
                )}
            </table>}
            <div className='pagination'>
                  {pages.map(page=> 
                    <div onClick={()=>{setCurrent(page)}} className={`${current===page? 'current' : 'page'}`}>{page+1}</div>
                  )}
            </div>
        </div>
    )
};

export default App;