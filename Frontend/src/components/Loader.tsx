import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 dark:border-white">
            <span className="loader"></span>
        </div>
    );
};

export default Loader;
