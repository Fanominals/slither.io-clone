import React from 'react';
import { ErrorScreenProps } from '../../types';

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
    return (
        <div className="screen">
            <div className="error-container">
                <h2>Connection Error</h2>
                <p>{message}</p>
                <button className="retry-button" onClick={onRetry}>
                    Retry
                </button>
            </div>
        </div>
    );
}; 