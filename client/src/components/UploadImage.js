import React from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import ViewImage from "./ViewImage";

const UploadImage = () => {
	const [image, setImage] = useState({
		photo: null,
	});
	const [preview, setPreview] = useState(null);
	const [dragActive, setDragActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("photo", image.photo);
		setLoading(true);
		axios
			.post("https://alvindev-img-uploader.herokuapp.com/upload/", formData)
			.then((res) => {
				console.log(res.data);
				setLoading(false);
				setDone(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDragEnter = (event) => {
		event.preventDefault();
		setDragActive(true);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setDragActive(false);
	};

	const handleDrop = (event) => {
		event.preventDefault();
		setDragActive(false);
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			setImage({ photo: event.dataTransfer.files[0] });
			setPreview(URL.createObjectURL(event.dataTransfer.files[0]));
		}
	};

	const handleClose = () => {
		setPreview(null);
		setImage({ photo: null });
	};

	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage({ ...image, photo: event.target.files[0] });
			setPreview(URL.createObjectURL(event.target.files[0]));
		}
	};

	return (
		<>
			{done ? (
				<ViewImage />
			) : loading ? (
				<Loading />
			) : (
				<div className="w-[402px] h-[469px] border-3xl shadow-lg rounded-lg py-9 px-8">
					<h1 className="text-lg font-medium text-gray-600 text-center mb-4">
						Upload Your Image
					</h1>
					<p className="text-xs text-center font-medium text-gray-400 mb-8">
						File should be Jpeg, Png,...
					</p>
					<form
						className="flex flex-col justify-center items-center "
						encType="multipart/form-data"
						onSubmit={handleSubmit}
					>
						{dragActive ? (
							<div
								className="h-56 w-full bg-zinc-100 border-2 border-dashed border-indigo-400 rounded-lg mb-5 flex justify-center flex-col items-center  transition-all ease-in-out delay-150"
								onDrop={(event) => handleDrop(event)}
								onDragOver={(event) => handleDragOver(event)}
								onDragEnter={(event) => handleDragEnter(event)}
								onDragLeave={(event) => handleDragLeave(event)}
							>
								Drop Image Here
							</div>
						) : (
							<div
								className="relative h-56 w-full bg-gray-100 border-2 border-dashed border-indigo-400 rounded-lg mb-5 flex justify-center flex-col items-center "
								onDragEnter={(event) => handleDragEnter(event)}
								onDragLeave={(event) => handleDragLeave(event)}
							>
								{preview ? (
									<>
										<img
											className="w-full h-full object-contain	"
											src={preview}
											alt="preview"
										/>
										<div
											className="absolute top-2 right-4 cursor-pointer font-bold"
											onClick={handleClose}
										>
											{" "}
											&#10005;
										</div>
									</>
								) : (
									<div className="flex justify-center items-end bg-image-icon h-full bg-no-repeat bg-center ">
										<p className="text-xs font-medium text-gray-400 pb-6">
											Drag &amp; Drop your image here
										</p>
									</div>
								)}
							</div>
						)}
						<span className="text-xs font-medium text-gray-400 mb-4">Or</span>
						<input
							name="photo"
							className="hidden"
							onChange={onImageChange}
							id="img"
							type="file"
							accept="image/jpg, image/png, image/jpeg"
						/>
						{preview ? (
							<input
								className="py-2 px-4 text-white font-medium text-xs bg-[#2F80ED] rounded-md cursor-pointer"
								type="submit"
								value="Upload"
							/>
						) : (
							<label
								htmlFor="img"
								className="py-2 px-4 text-white font-medium text-xs bg-[#2F80ED] rounded-md cursor-pointer"
							>
								Choose a file
							</label>
						)}
					</form>
				</div>
			)}
		</>
	);
};

export default UploadImage;
