import { SnakeSegment, Vector2D } from '../../common/constants';

export class Collision {
    
    // Check if a snake head collides with any segment of another snake
    checkSnakeCollision(head: SnakeSegment, otherSnakeSegments: SnakeSegment[]): boolean {
        for (const segment of otherSnakeSegments) {
            const distance = this.calculateDistance(head, segment);
            const minDistance = head.radius + segment.radius;
            
            if (distance < minDistance) {
                return true;
            }
        }
        return false;
    }

    // Check if a point is inside a circle
    checkPointInCircle(point: Vector2D, circle: SnakeSegment): boolean {
        const distance = this.calculateDistance(point, circle);
        return distance < circle.radius;
    }

    // Check if two circles overlap
    checkCircleCollision(circle1: SnakeSegment, circle2: SnakeSegment): boolean {
        const distance = this.calculateDistance(circle1, circle2);
        const minDistance = circle1.radius + circle2.radius;
        return distance < minDistance;
    }

    // Calculate distance between two points
    private calculateDistance(point1: Vector2D, point2: Vector2D): number {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Check if a snake head is about to collide with another snake (predictive)
    checkPredictiveCollision(
        head: SnakeSegment, 
        velocity: Vector2D, 
        otherSnakeSegments: SnakeSegment[],
        deltaTime: number
    ): boolean {
        // Calculate predicted position
        const predictedHead: SnakeSegment = {
            x: head.x + velocity.x * deltaTime,
            y: head.y + velocity.y * deltaTime,
            radius: head.radius
        };

        return this.checkSnakeCollision(predictedHead, otherSnakeSegments);
    }

    // Check if a line segment intersects with a circle
    checkLineCircleCollision(
        lineStart: Vector2D, 
        lineEnd: Vector2D, 
        circle: SnakeSegment
    ): boolean {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const fx = lineStart.x - circle.x;
        const fy = lineStart.y - circle.y;

        const a = dx * dx + dy * dy;
        const b = 2 * (fx * dx + fy * dy);
        const c = (fx * fx + fy * fy) - circle.radius * circle.radius;

        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
            return false;
        }

        const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

        return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
    }

    // Get the closest point on a line segment to a point
    getClosestPointOnLine(point: Vector2D, lineStart: Vector2D, lineEnd: Vector2D): Vector2D {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const lengthSquared = dx * dx + dy * dy;

        if (lengthSquared === 0) {
            return lineStart;
        }

        const t = Math.max(0, Math.min(1, 
            ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lengthSquared
        ));

        return {
            x: lineStart.x + t * dx,
            y: lineStart.y + t * dy
        };
    }
} 