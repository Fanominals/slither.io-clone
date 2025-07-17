import React from 'react';
import { HUDProps } from '../../types';

export const HUD: React.FC<HUDProps> = ({ length, fps }) => {
    return (
        <div className="game-ui">
            <div id="hudTopLeft">
                <span id="fpsCounter">FPS: {fps}</span>
            </div>
            <div className="score-block">
                <div>Length: {length}</div>
            </div>
        </div>
    );
}; 