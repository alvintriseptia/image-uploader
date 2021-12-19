import React from "react";

const Loading = () => {
	return (
		<div className="w-[400px] h-[143px] px-8 py-9 border-3xl shadow-lg rounded-lg">
			<h1 className="text-lg text-gray-600 font-medium">Uploading...</h1>
			<div className="relative w-full h-1.5 bg-gray-300 overflow-hidden">
				<div className="absolute w-16 h-1.5 bg-blue-500 animate-[loading_2s_ease-in-out_infinite]"></div>
			</div>
		</div>
	);
};

export default Loading;
