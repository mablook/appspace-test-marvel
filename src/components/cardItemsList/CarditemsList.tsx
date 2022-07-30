import { FC, useEffect } from "react"
import './CardItemsList.scss';
import CardItem from "../cardItems/CardItem"
import { CharacterItem } from "uiTypes";
import PageFadeIn from "src/hoc/pageFadeIn";
import CardSearchBar from "../cardSearchBar/CardSearchBar";

type Props = {
  items?: CharacterItem[]
  total?:number
}

const CardItemsList:FC<Props> = ({items, total}) => {

    return(
      <>
      <CardSearchBar/>
      <PageFadeIn waitFor={[items]}>
      <div className="main main-padding">
        <div className="total-items">found {total} results</div>
        {
            items && items.map((e, i) => {
                return(<CardItem key={`${e.id}-${i}`} item={e} />)
            })
        }
        </div>
      </PageFadeIn>
      </>
    )
}

export default CardItemsList
