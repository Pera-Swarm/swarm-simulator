import { Localization } from './localization';
import { Coordinate, CoordinateValueInt } from '../coordinate';

/**
 * @class SimpleLocalizationSystem
 */
export class SimpleLocalizationSystem {
    protected _ids: number[];
    protected _localization: Localization<number>;

    constructor() {
        this._ids = [];
        this._localization = new Localization();
    }

    /**
     * coordinates list.
     */
    get coordinates(): CoordinateValueInt<number>[] {
        return this._localization.getCoordinates();
    }

    /**
     * ids list.
     */
    get ids(): number[] {
        return this._ids;
    }

    /**
     * size of the coordinates list.
     */
    get size(): number {
        return this._localization.size;
    }

    /**
     *
     * method for checking a given id exists in the ids list.
     * @param {number} id robot id
     */
    idExists = (id: number) => {
        let findNaN = id !== id;
        let indexOf;
        if (!findNaN && typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
            return indexOf.call(this.ids, id) > -1;
        } else {
            indexOf = (ids: number[], id: number) => {
                let i = -1,
                    index = -1;
                console.log(ids.length);
                console.log(ids[i]);

                for (i = 0; i < ids.length; i++) {
                    let item = ids[i];
                    if ((findNaN && item !== item) || item === id) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
            return indexOf(this.ids, id) > -1;
        }
    };

    /**
     * method for adding a coordinate to the coordinates list.
     * @param {CoordinateValueInt} coordinate coordinate instance
     */
    add = (coordinate: CoordinateValueInt<number>) => {
        if (coordinate && coordinate.id) {
            this._localization.add(coordinate);
            this._ids.push(coordinate['id']);
        }
    };

    /**
     * method for updating the coordinates list.
     * this method will add/update the given coordinates to the localization list.
     * @param {CoordinateValueInt|CoordinateValueInt[]} coordinates
     * supported coordinates types : array, valid_coordinate_object
     */
    update = (coordinates: CoordinateValueInt<number> | CoordinateValueInt<number>[]) => {
        let status = this._localization.update(coordinates);
        if (status === true) {
            if (Array.isArray(coordinates)) {
                coordinates.map((item) => {
                    if (this.idExists(item['id']) === false) {
                        this.ids.push(item['id']);
                    }
                });
            }
        }
        return status;
    };
}
