const AnimatedBlobBackground = () => {
    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-10 bg-gray-100"
            aria-hidden="true"
        >
            <div className="absolute inset-0 filter blur-[100px]">
                <div className="absolute w-72 h-72 rounded-full opacity-70 bg-[#ffafcc] top-[10%] left-[10%] animate-move1"></div>
                <div className="absolute w-72 h-72 rounded-full opacity-70 bg-[#a2d2ff] bottom-[5%] right-[5%] animate-move2"></div>
                <div className="absolute w-72 h-72 rounded-full opacity-70 bg-[#bde0fe] bottom-[20%] left-[15%] animate-move3"></div>
                <div className="absolute w-72 h-72 rounded-full opacity-70 bg-[#cdb4db] top-[5%] right-[15%] animate-move4"></div>
            </div>
        </div>
    );
};

export default AnimatedBlobBackground;