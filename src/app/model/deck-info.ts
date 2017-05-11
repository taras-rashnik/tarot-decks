// structure from decks.json file
// indexing from left to right then from top to bottom
export interface DeckInfo {
    id: number;
    name: string;
    imageUrl: string;
    cardsWidth: number;
    cardsHeight: number;
    horizontalGap: number;
    verticalGap: number;
    cardsInRow: number;
    cardsInColumn: number;
    cardsNumber: number;
    backSideIndex: number;
    deckPictureIndex: number;
}
