import { API_URL } from "../config";
import { ShuffleCardsRespType, DrawCardRespType } from "../types/api";

export const shuffleCards = (): Promise<ShuffleCardsRespType> =>
  fetch(`${API_URL}/new/shuffle`).then((res) => res.json());

export const drawCard = (deckID: string): Promise<DrawCardRespType> =>
  fetch(`${API_URL}/${deckID}/draw/?count=1`).then((res) => res.json());

const API = {
  shuffleCards,
  drawCard,
};

export default API;
