import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CardItemsList from './components/cardItemsList/CarditemsList';
import CardDetails from './components/cardDetails/CardDetails';
import { useDispatch, useSelector } from 'react-redux';
import { charactersSelector, clearCharactersItems, getCharactersByName, orderItemSelector, searchItemSelector, searchResultTotalSelector } from './redux/__marvel__/character/collection-slice';
import CardSearchBar from './components/cardSearchBar/CardSearchBar';

function App() {

    const dispatch = useDispatch();
    const items = useSelector(charactersSelector)
    const total = useSelector(searchResultTotalSelector)
    const globalSearch = useSelector(searchItemSelector);
    const globalOrder = useSelector(orderItemSelector)
    const filterRef = useRef<any>({ search: '', order: 'name', firstRender: true })

    const handleFilter = async (search?: string, order?: string) => {
        await dispatch(clearCharactersItems())
        await dispatch(getCharactersByName({ name: search, order: order, limit: 12 }))
    }

    useEffect(() => {
        dispatch(getCharactersByName({ limit: 12 }))
        filterRef.current.firstRender = false
    }, [])

    useEffect(() => {
        if (globalSearch !== filterRef.current.search || globalOrder !== filterRef.current.order) {
            handleFilter(globalSearch, globalOrder)
            filterRef.current = { ...filterRef.current, search: globalSearch, order: globalOrder }
        }
    }, [globalSearch, globalOrder])


    return (
        <BrowserRouter>

                <Routes>
                    <Route path="/" element={<CardItemsList items={items} total={total} />} />
                    <Route path="/view-item" element={<CardDetails />} >
                        <Route path=":itemId" element={<CardItemsList />}></Route>
                    </Route>
                    <Route path="/" element={<CardItemsList items={items} total={total}/>}></Route>
                </Routes>

        </BrowserRouter>
    );
}

export default App;
