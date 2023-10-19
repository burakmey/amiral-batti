import MainVariables from "../context/MainVariables";

const MAX_ROW = MainVariables.MAX_ROW;
const MAX_COLUMN = MainVariables.MAX_COLUMN;
const FLEETS = MainVariables.FLEETS;

export default class ComputerShooting {
  #currentFleet;
  #possibleLocations;
  #availableLocations;
  constructor() {
    this.placedFleets = [];
    this.#currentFleet = { location: [], shipCount: FLEETS[0] };
    this.#possibleLocations = [];
    this.#availableLocations = Array.from(Array(100).keys());
  }
}
