import { FoodData } from '../../common/constants';

export class Food {
    public id: string;
    public x: number;
    public y: number;
    public color: string;
    public size: number;
    public mass: number;

    constructor(
        id: string,
        x: number,
        y: number,
        color: string,
        size: number,
        mass: number
    ) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.mass = mass;
    }

    // Get food data for network transmission
    getFoodData(): FoodData {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            color: this.color,
            size: this.size,
            mass: this.mass
        };
    }
} 