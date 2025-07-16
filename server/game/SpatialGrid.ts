export class SpatialGrid<T> {
    private cellSize: number;
    private grid: Map<string, T[]>;

    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    private cellKey(x: number, y: number): string {
        const cx = Math.floor(x / this.cellSize);
        const cy = Math.floor(y / this.cellSize);
        return `${cx},${cy}`;
    }

    clear() {
        this.grid.clear();
    }

    insert(x: number, y: number, value: T) {
        const key = this.cellKey(x, y);
        if (!this.grid.has(key)) {
            this.grid.set(key, []);
        }
        this.grid.get(key)!.push(value);
    }

    // Get all values within a specified radius of (x, y)
    // Accepts an optional position accessor for custom object structures
    queryRadius(x: number, y: number, radius: number, getPos?: (obj: T) => { x: number, y: number }): T[] {
        const results: T[] = [];
        const radiusSquared = radius * radius;
        
        // Calculate the range of cells we need to check
        const minCellX = Math.floor((x - radius) / this.cellSize);
        const maxCellX = Math.floor((x + radius) / this.cellSize);
        const minCellY = Math.floor((y - radius) / this.cellSize);
        const maxCellY = Math.floor((y + radius) / this.cellSize);
        
        // Check all cells that could contain objects within the radius
        for (let cx = minCellX; cx <= maxCellX; cx++) {
            for (let cy = minCellY; cy <= maxCellY; cy++) {
                const key = `${cx},${cy}`;
                if (this.grid.has(key)) {
                    const cellObjects = this.grid.get(key)!;
                    
                    // Filter objects within the actual radius
                    for (const obj of cellObjects) {
                        let objX: number, objY: number;
                        if (getPos) {
                            const pos = getPos(obj);
                            objX = pos.x;
                            objY = pos.y;
                        } else {
                            objX = (obj as any).x;
                            objY = (obj as any).y;
                        }
                        if (objX !== undefined && objY !== undefined) {
                            const dx = objX - x;
                            const dy = objY - y;
                            const distanceSquared = dx * dx + dy * dy;
                            if (distanceSquared <= radiusSquared) {
                                results.push(obj);
                            }
                        }
                    }
                }
            }
        }
        return results;
    }
} 