declare module "uiTypes" {

  export interface CharactersItemState{
    item?: CharacterItem[]
    status: Status
    error?: string
  }

  export interface CharactersState{
    result?: Characters[]
    items?: CharacterItem[]
    search?: string
    order?: 'name' | '-name'
    total?: number
    status: Status
    error?: string
  }

  export interface Characters{
    count: number
    limit: number
    offset: number
    results: CharacterItem[]
    total: number

  }

  export interface CharacterItem {
    id: number
    name: string
    description: string
    modified: string
    thumbnail: Thumbnail
    resourceURI: string
    comics: Comics
    series: Series
    stories: Stories
    events: Events
    urls: Url[]
  }

  export interface Thumbnail {
    path: string
    extension: string
  }

  export interface Comics {
    available: number
    collectionURI: string
    items: Item[]
    returned: number
  }

  export interface Item {
    resourceURI: string
    name: string
  }

  export interface Series {
    available: number
    collectionURI: string
    items: Item2[]
    returned: number
  }

  export interface Item2 {
    resourceURI: string
    name: string
  }

  export interface Stories {
    available: number
    collectionURI: string
    items: Item3[]
    returned: number
  }

  export interface Item3 {
    resourceURI: string
    name: string
    type: string
  }

  export interface Events {
    available: number
    collectionURI: string
    items: Item4[]
    returned: number
  }

  export interface Item4 {
    resourceURI: string
    name: string
  }

  export interface Url {
    type: string
    url: string
  }

  export type Status = "idle" | "pending" | "fulfilled" | "rejected";

}
