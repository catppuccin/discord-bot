import { EventObject } from '../../global' 

export default class Event implements EventObject {
  name: string
  execute: Function

  constructor(event: EventObject) {
    this.name = event.name
    this.execute = event.execute
  }
}