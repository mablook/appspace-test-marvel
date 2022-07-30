import { FC, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap";
import './CardSearchBar.scss';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';
import { ArrowDownCircleFill } from 'react-bootstrap-icons';
import { SearchHeartFill } from 'react-bootstrap-icons';
import background from '../../assets/jpg/marvel-header.jpg';
import { useDispatch, useSelector } from "react-redux";
import { searchItemSelector, setOrderValue, setSearchValue } from "src/redux/__marvel__/character/collection-slice";
import { useLocation, useNavigate } from "react-router-dom";

const CardSearchBar: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState<string>("")

    const globalSearch = useSelector(searchItemSelector);

    const [order, setOrder] = useState<boolean>(true);

    const handleSearch = () => {
        if (search !== globalSearch) {
            dispatch(setSearchValue({ value: search }))
            navigate('/')
        }
    }


    useEffect(() => {
        globalSearch && setSearch(globalSearch)
    }, [globalSearch])

    useEffect(() => {
        if (order) {
            dispatch(setOrderValue({ value: 'name' }))
        } else {
            dispatch(setOrderValue({ value: '-name' }))
        }
    }, [order])

    const backGroundImage = `url(${background})`

    return (
        <header className="header">
        <div className="header-content">
        <div style={{ backgroundImage: backGroundImage, backgroundColor: '#fff' }} className="card-search-container">
            <div className="search-title search-element">
                Find your hero
            </div>
            <div className="search-inputs">
            <div className="search-element">
                <input type="text" className="input-search" value={search} onChange={e => setSearch(e.currentTarget.value)} />
                <button className="button-search" onClick={handleSearch}><SearchHeartFill/></button>
            </div>
            <div className="search-element">
                <button className="button-order" onClick={() => setOrder(!order)}>{order ? <ArrowDownCircleFill /> : <ArrowUpCircleFill />} A</button>
            </div>
            </div>
        </div>
        </div>
  </header>
    )
}

export default CardSearchBar
