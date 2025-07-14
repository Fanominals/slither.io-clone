import { FoodData } from '../../common/constants';

export class Food {
    public id: string;
    public x: number;
    public y: number;
    public color: string;
    public size: number;
    public lengthIncrement: number;

    constructor(
        id: string,
        x: number,
        y: number,
        color: string,
        size: number,
        lengthIncrement: number
    ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.lengthIncrement = lengthIncrement;
    }

    // Get food data for network transmission
    getFoodData(): FoodData {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            color: this.color,
            size: this.size,
            lengthIncrement: this.lengthIncrement
        };
    }
} 