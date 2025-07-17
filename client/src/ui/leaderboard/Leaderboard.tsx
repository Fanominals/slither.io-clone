import React from 'react';
import { LeaderboardProps } from '../../types';

export const Leaderboard: React.FC<LeaderboardProps> = ({ players, localPlayerId }) => {
    // Sort players by length descending and take top 5
    const topPlayers = [...players]
        .filter(player => player.alive)
        .sort((a, b) => b.length - a.length)
        .slice(0, 5);

    const medals = ['🥇', '🥈', '🥉'];

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-title">🏆 Leaderboard</div>
            <ol className="leaderboard-list">
                {topPlayers.map((player, index) => {
                    const isLocalPlayer = player.id === localPlayerId;
                    const rankClass = index < 3 ? ['gold', 'silver', 'bronze'][index] : '';
                    
                    return (
                        <li 
                            key={player.id} 
                            className={`${isLocalPlayer ? 'user' : ''} ${rankClass}`}
                        >
                            <span className={index < 3 ? 'medal' : 'rank'}>
                                {index < 3 ? medals[index] : (index + 1)}
                            </span>
                            <span className="nickname">{player.nickname}</span>
                            <span className="length">{player.length}</span>
                        </li>
                    );
                })}
            </ol>
            <div className="leaderboard-footer">
                {players.length} players online
            </div>
        </div>
    );
}; 