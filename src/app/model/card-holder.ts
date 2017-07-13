import { Card } from "./card";
import { ShapePosition } from "./shape-position";

export class CardHolder {
  cardId: number;
  deckId: number;
  showBackSide: boolean;
  position: ShapePosition;
}
