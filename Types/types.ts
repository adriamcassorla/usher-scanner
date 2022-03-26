type Ticket = {
  id: string,
  show: Show,
  show_id: string,
  used: boolean,
  user_id: string,
}

type Show = {
  id: string,
  date: string,
  active_sale: boolean,
  available_seats: number,
  tickets: Ticket[],
  event: EventType,
  event_id: number
}

type EventType = {
  id: number,
  name: string,
  price: number,
  type: string,
  genres: string[],
  image?: string,
  poster?: string,
  language?: string,
  duration?: number,
  description?: string,
  external_url?: string,
  venue_id: string,
  shows: Show[],
}