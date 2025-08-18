import React from 'react';

type ProgressBarProps = {
    value: number;
    max: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-600">Progress</span>
                <span className="text-sm font-medium text-blue-600">{value} / {max} Questions</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;