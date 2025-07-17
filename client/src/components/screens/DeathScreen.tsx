import React from 'react';
import { DeathScreenProps } from '../../types';

export const DeathScreen: React.FC<DeathScreenProps> = ({ 
    finalLength, 
    timeAlive, 
    eliminations, 
    onRespawn 
}) => {
    return (
        <div className="death-screen">
            <div className="death-content">
                <div className="death-header">
                    <span className="death-icon">❌</span>
                    <h2 className="death-title">Game Over</h2>
                </div>
                <div className="death-stats-row">
                    <div className="death-stat">
                        <span className="stat-icon stat-time">⏰</span>
                        <span className="stat-value">{timeAlive}</span>
                        <span className="stat-label">Time Survived</span>
                    </div>
                    <div className="death-stat">
                        <span className="stat-icon stat-kills">🔥</span>
                        <span className="stat-value">{eliminations}</span>
                        <span className="stat-label">Eliminations</span>
                    </div>
                    <div className="death-stat">
                        <span className="stat-icon stat-length">🟢</span>
                        <span className="stat-value">{finalLength}</span>
                        <span className="stat-label">Length</span>
                    </div>
                </div>
                <button className="respawn-button" onClick={onRespawn}>
                    Play Again
                </button>
            </div>
        </div>
    );
}; 