import { Deck } from "./deck";

export class Session {
    id: number = Date.now();
    selectedDeck: Deck;
    
    constructor(private name: string){
    }
}
