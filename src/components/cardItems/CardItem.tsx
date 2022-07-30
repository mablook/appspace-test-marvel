import { FC } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { CharacterItem } from "uiTypes";
import './CardItem.scss';

type Props = {
  item: CharacterItem
}

const CardItem:FC<Props> = ({item}) => {

  let navigate = useNavigate();

  const { thumbnail } = item



  const viewCard = ({id}:{id:number}) => {
    navigate('view-item', {state:{id:id,name:'sabaoon'}})
  }



    return (
      <div className="card-item" onClick={() => viewCard({ id:item.id })}>
        <div className="card-blur"></div>
        <div className="card-image" style={{ backgroundImage: `url(${thumbnail.path}.${thumbnail.extension})` }}>
        </div>
        <div>
          <span><figcaption className="card-caption-text">{item.name}</figcaption></span>
        </div>
      </div>
    );
  }

  export default CardItem
