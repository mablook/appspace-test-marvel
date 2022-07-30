import { FC, useEffect } from "react"
import './CardItemsList.scss';
import CardItem from "../cardItems/CardItem"
import { CharacterItem } from "uiTypes";
import PageFadeIn from "src/hoc/pageFadeIn";

type Props = {
  items?: CharacterItem[]
  total?:number
}

const CardItemsList:FC<Props> = ({items, total}) => {

    return(
      <PageFadeIn waitFor={[items]}>
        <div className="total-items">found {total} results</div>
        {
            items && items.map(e => {
                return(<CardItem key={e.id} item={e} />)
            })
        }
      </PageFadeIn>
    )
}

export default CardItemsList
