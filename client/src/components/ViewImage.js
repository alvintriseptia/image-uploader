import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ViewImage = () => {
	const [loading, setLoading] = useState(false);
	const [review, setReview] = useState(null);
	const [copied, setCopied] = useState(false);

	const getImg = () => {
		const headers = { "Content-Type": "application/json" };
		setLoading(true);
		axios
			.get("/upload", { headers })
			.then((res) => {
				setLoading(false);
				setReview(res.data[res.data.length - 1].photo);
			})
			.catch((err) => {
				throw err;
			});
	};

	useEffect(() => {
		getImg();
	}, []);
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="w-[402px] h-[469px] border-3xl shadow-lg rounded-lg py-9 px-8 flex flex-col items-center space-y-4">
					<span className="material-icons bg-green-500 rounded-full text-white">
						check_circle
					</span>
					<h1 className="text-lg text-gray-700 font-medium">
						Upload Successfully
					</h1>
					<div className=" h-56 w-full bg-gray-100 rounded-lg flex justify-center items-center">
						<img
							className="w-full h-full object-contain"
							src={`https://ancient-shelf-48453.herokuapp.com/images/${review}`}
							alt="review"
						/>
					</div>

					<div className="relative w-full h-8 rounded-lg border border-gray-400 px-2 py-2">
						<CopyToClipboard
							text={`https://ancient-shelf-48453.herokuapp.com/images/${review}`}
							onCopy={() => setCopied(true)}
						>
							<button
								className="absolute right-0 top-0 px-4 py-2 bg-blue-500 text-xs rounded-lg text-white font-medium"
								onCopy={() => setCopied(true)}
							>
								{copied ? "Copy Success" : "Copy Link"}
							</button>
						</CopyToClipboard>

						<form className="text-xs">
							<input
								className="w-full"
								value={`https://ancient-shelf-48453.herokuapp.com/images/${review}`}
								disabled
							/>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default ViewImage;
