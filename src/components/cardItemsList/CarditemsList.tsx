import { FC, useEffect } from "react"
import './CardItemsList.scss';
import CardItem from "../cardItems/CardItem"
import { CharacterItem } from "uiTypes";
import PageFadeIn from "src/hoc/pageFadeIn";
import CardSearchBar from "../cardSearchBar/CardSearchBar";

type Props = {
  items?: CharacterItem[]
  total?:number
  offset?:number
  nextAction?: () => void
  prevAction?: () => void
}

const CardItemsList:FC<Props> = ({items, total, nextAction, prevAction, offset}) => {


    return(
      <>
      <CardSearchBar/>
      <PageFadeIn waitFor={[items]}>
      <div className="main main-padding">
        <div className="total-items"><div onClick={prevAction ? prevAction : ()=>{}} className={`navigate`}>prev</div> found {total} results <div onClick={nextAction ? nextAction : ()=>{}} className={`navigate`}>next</div></div>
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
