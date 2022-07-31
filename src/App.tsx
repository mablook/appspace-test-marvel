import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CardItemsList from './components/cardItemsList/CarditemsList';
import CardDetails from './components/cardDetails/CardDetails';
import { useDispatch, useSelector } from 'react-redux';
import { charactersSelector, clearCharactersItems, getCharactersByName, orderItemSelector, searchItemSelector, searchResultTotalSelector } from './redux/__marvel__/character/collection-slice';
import { current } from '@reduxjs/toolkit';
import { OffcanvasTitle } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

type Ref = {
    name?:string
    order?: 'name' | '-name'
    limit?: number
    offset?: number

}

function App() {

    const dispatch = useDispatch();
    const items = useSelector(charactersSelector)
    const total = useSelector(searchResultTotalSelector)
    const globalSearch = useSelector(searchItemSelector);
    const globalOrder = useSelector(orderItemSelector)
    const [limit,setLimit] = useState<number>(12)
    const [offset,setOffset] = useState<number>(0)
    const filterRef = useRef<Ref>({ name: '', order: 'name', offset: 0 })

    const handleNext = async () => {
        if(total && offset + 12 < total){
            setOffset(prev => prev + 12)
        }
    }

    const handlePrev = async () => {
        if(offset - 12 > -1){
            setOffset(prev => prev - 12)
        }
    }

    const handleFilter = async ({search, order, offset}:{search?: string, order?: string, offset?:number}) => {
        await dispatch(clearCharactersItems())
        await dispatch(getCharactersByName({ name: search, order: order, limit: limit, offset: offset }))
    }

    useEffect(() => {
        if(total && offset < (total + 12)){
            filterRef.current = { ...filterRef.current, offset: offset }
            handleFilter({search : filterRef.current.name, order:filterRef.current.order, offset:filterRef.current.offset})
        }
    },[offset, total])



    useEffect(() => {
        if (globalSearch !== filterRef.current.name || globalOrder !== filterRef.current.order) {
            setOffset(0)
            handleFilter({search:globalSearch, order:globalOrder})
            filterRef.current = { ...filterRef.current, name: globalSearch, order: globalOrder, offset: 0 }
        }
    }, [globalSearch, globalOrder,filterRef])


    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CardItemsList items={items} total={total} offset={offset} prevAction={handlePrev} nextAction={handleNext} />} />
                    <Route path="/view-item" element={<CardDetails />} >
                        <Route path=":itemId" element={<CardItemsList />}></Route>
                    </Route>
                    <Route path="/" element={<CardItemsList items={items} total={total}/>}></Route>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
