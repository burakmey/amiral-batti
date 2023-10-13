const MAX_ROW = 10;
const MAX_COLUMN = 10;
const FLEETS = [5, 4, 3, 3, 2];

export default class ComputerPlacement {
  constructor(cellRefs) {
    this.currentFleet = { location: [], shipCount: FLEETS[0] };
    this.placedFleets = [];
    this.availableLocations = [];
    this.unavailableLocations = [];
    this.cellRefs = cellRefs;
  }

  setAvailableLocations(cell, array) {
    let top = cell - MAX_COLUMN < 0 ? -1 : cell - MAX_COLUMN;
    let bottom =
      cell + MAX_COLUMN > MAX_COLUMN * MAX_ROW - 1 ? -1 : cell + MAX_COLUMN;
    let left = (cell % MAX_COLUMN) - 1 < 0 ? -1 : cell - 1;
    let right = (cell % MAX_COLUMN) + 1 < MAX_COLUMN ? cell + 1 : -1;
    const locations = [top, right, bottom, left];
    locations.forEach((element) => {
      if (
        element !== -1 &&
        !array.includes(element) &&
        !this.currentFleet.location.includes(element) &&
        !this.unavailableLocations.includes(element)
      ) {
        array.push(element);
      }
    });
  }

  setUnavailableLocations = (cell) => {
    let iStart = cell - MAX_COLUMN < 0 ? 0 : -1;
    let iStop = cell + MAX_COLUMN > MAX_COLUMN * MAX_ROW - 1 ? 0 : 1;
    let jStart = (cell % MAX_COLUMN) - 1 < 0 ? 0 : -1;
    let jStop = (cell % MAX_COLUMN) + 1 < MAX_COLUMN ? 1 : 0;

    for (let i = iStart; i <= iStop; i++)
      for (let j = jStart; j <= jStop; j++) {
        let location = cell + i * MAX_COLUMN + j;
        if (
          !this.unavailableLocations.includes(location) &&
          !this.placedFleets[this.placedFleets.length - 1].includes(location)
        ) {
          this.unavailableLocations.push(location);
          this.cellRefs.current[location]?.setUnavailable();
        }
      }
  };

  isPlaceable(random) {
    if (
      this.unavailableLocations.includes(random) ||
      this.placedFleets.some((array) => array.includes(random))
    ) {
      return false;
    } else {
      let locations = [];
      this.setAvailableLocations(random, locations);
      if (locations.length >= this.currentFleet.shipCount) return true;
      else {
        for (let i = 0; i < locations.length; i++) {
          this.setAvailableLocations(locations[i], locations);
          if (locations.length >= this.currentFleet.shipCount) return true;
        }
      }
    }
    return false;
  }

  placeShip() {
    if (this.placedFleets.length === FLEETS.length) return;
    while (true) {
      const random = Math.floor(Math.random() * 100);
      if (this.isPlaceable(random)) {
        this.currentFleet.location.push(random);
        this.cellRefs.current[random]?.setShip();
        this.setAvailableLocations(random, this.availableLocations);
        break;
      }
    }
    while (this.currentFleet.shipCount !== this.currentFleet.location.length) {
      const randomIndex = Math.floor(
        Math.random() * this.availableLocations.length
      );
      const random = this.availableLocations[randomIndex];
      const index = this.availableLocations.indexOf(random);
      if (index !== -1) this.availableLocations.splice(index, 1);
      this.currentFleet.location.push(random);
      this.cellRefs.current[random]?.setShip();
      this.setAvailableLocations(random, this.availableLocations);
    }
    this.placedFleets.push(this.currentFleet.location);
    this.placedFleets[this.placedFleets.length - 1].forEach((element) => {
      this.setUnavailableLocations(element);
    });
    this.availableLocations = [];
    this.currentFleet.location = [];
    this.currentFleet.shipCount = FLEETS[this.placedFleets.length];
    console.log(this.placedFleets[this.placedFleets.length - 1]);
  }
}
