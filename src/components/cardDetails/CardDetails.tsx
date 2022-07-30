import { FC, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageFadeIn from "src/hoc/pageFadeIn";
import { characterItemSelector, clearCharacterItem, getCharacter } from "src/redux/__marvel__/character/item-slice";
import { CharacterItem, Thumbnail } from "uiTypes";
import Trademark from "../trademark/Trademark";
import { ArrowLeftCircleFill } from 'react-bootstrap-icons';
import './CardDetails.scss';

const CardDetails: FC = () => {
    const navigate = useNavigate();
    const location: any = useLocation();
    const params = useParams();
    const dispatch = useDispatch();

    const [itemId, setItemId] = useState<string>()
    const [item, setItem] = useState<CharacterItem>()
    const [background, setBackground] = useState<string>()
    const [link, setLink] = useState<string>()

    const selectorItem = useSelector(characterItemSelector)

    useEffect(() => {
        selectorItem && setItem(selectorItem[0])
    }, [selectorItem])

    useEffect(() => {
        if (itemId) {
            dispatch(getCharacter({ id: Number(itemId) }))
        }
        return () => {
            dispatch(clearCharacterItem())
            setItem(undefined)
        }
    }, [itemId])

    useEffect(() => {
        if (params && params.itemId !== itemId || location.state && location.state.id !== itemId) {
            setItemId(params.itemId || location.state.id)
            window.history.replaceState(null, "New Page Title", `/view-item/${params.itemId || location.state.id}`)
        }
    }, [params, location && location.state])

    useEffect(() => {
        if (item && item.urls) {
            const _link = item.urls.filter(e => e.type === 'comiclink')[0]
            if (_link) {
                setLink(_link.url)
            }
        }
        if (item && item.thumbnail) {
            setBackground(`${item.thumbnail.path}.${item.thumbnail.extension}`)
        }
    }, [item])

    return (
        <PageFadeIn waitFor={[item]}>
                  <div className="main main-padding">
        <div className="card-content">

            <div className="link-back">
                        <div onClick={() => navigate(-1)}><ArrowLeftCircleFill/> back to list</div>
            </div>
            <div className="card-details">
                <div className="flex-row">
                    <div className="link-container">
                        <a href={link} className="button-link" target="_blank">see on Marvel.com</a>
                    </div>
                    <div>
                        <div className="details-image" style={{ backgroundImage: `url(${background})` }}>
                        </div>
                    </div>
                    <div className="card-list-details">
                        <div>
                            <div className="text-title">{item?.name}</div>
                        </div>

                        <div>
                            <div className="text-description">{item?.description ? `${item.description.substring(0, 100)}...` : 'no description'}</div>
                        </div>
                        <div>
                            <div className="list-title">
                                series available <b>{item?.series.available}</b>
                            </div>
                        </div>
                        <div>
                            <div>
                                <ul className="item-list">
                                    {item?.comics && item.series.items.slice(0, 4).map(e => {
                                        return (<li key={`${e.resourceURI}`}>{e.name}</li>)
                                    })}

                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="list-title">
                                comics available <b>{item?.comics.available}</b>
                            </div>
                        </div>
                        <div>
                            <div>
                                <ul className="item-list">
                                    {item?.comics && item.comics.items.slice(0, 4).map(e => {
                                        return (<li key={`${e.resourceURI}`}>{e.name}</li>)
                                    })}

                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="list-title">
                                stories available <b>{item?.stories.available}</b>
                            </div>
                        </div>
                        <div>
                            <div>
                                <ul className="item-list">
                                    {item?.comics && item.stories.items.slice(0, 4).map(e => {
                                        return (<li key={`${e.resourceURI}`}>{e.name}</li>)
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Trademark/>
        </div>
        </div>
        </PageFadeIn>
    )
}

export default CardDetails
