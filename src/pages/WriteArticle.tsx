import { useState, useContext, useEffect, ChangeEvent } from "react";
import { NavBar } from "../components/common/navbar";
import { Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { UserContext } from "../App";
import addData from "../firebase/addData";
import addStorage from "../firebase/addStorage.js";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'; 

interface Article {
    article: string;
    author: string;
    caption: string;
    description: string;
    image: string;
    likes: number;
    publishdate: firebase.firestore.Timestamp;
    title: string;
}

export const WriteArticle = () => {
    const [formState, setFormState] = useState({
        article: '',
        caption: '',
        description: '',
        title: '',
        image: '',
    });
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [userCanWrite, setUserCanWrite] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { userData, userId } = useContext(UserContext);

    useEffect(() => {
        console.log(userId);
        setUserCanWrite(userData?.roles?.includes("writer") || userData?.roles?.includes("admin") || false);
        if (!userData) {
            window.location.href = "/signin";
        }
    }, [userData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImageSrc(reader.result);
                    const img = new Image();
                    img.src = reader.result as string;
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleRemoveImage = () => {
        setImageSrc(null);
        setFile(null);
        setFormState(prevState => ({
            ...prevState,
            image: '',
        }));
        const fileInput = document.getElementById('cover') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const submitArticle = async () => {
        setSubmitting(true);
        
        let imageUrl = '';
        if (file) {
            const { link, error } = await addStorage(file, formState.title);
            if (error) {
                console.error("Error uploading image:", error);
                setSubmitting(false);
                return;
            }
            imageUrl = link;
        }

        const articleData: Article = {
            ...formState,
            image: imageUrl,
            author: userId || 'Unknown',
            likes: 0,
            publishdate: firebase.firestore.Timestamp.fromDate(new Date()),
        };

        await addData("articles", articleData);
        setSubmitting(false);
        window.location.href = "/article/" + formState.title;
    };

    return (
        <>
            <NavBar />
            {submitting ? (
                <div className="flex justify-center items-center h-screen">
                    <Spinner size="xl" />
                </div>
            ) : userCanWrite ? (
                <div className="pt-[100px]">
                    <div className="flex flex-col items-center px-20 py-10 h-fit gap-4">
                        <p className="self-start text-2xl sm:text-[40px] ">Let's write an article!</p>
                        <input
                            type="text"
                            name="title"
                            value={formState.title}
                            placeholder="Title..."
                            className="bg-gray-700 rounded-full px-4 py-4 w-[40%] min-w-[215px] self-center sm:self-start"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="description"
                            value={formState.description}
                            placeholder="Description..."
                            className="bg-gray-700 rounded-full px-4 py-4 w-[40%] min-w-[215px] self-center sm:self-start"
                            onChange={handleInputChange}
                        />
                        
                        <div className="w-full flex flex-col sm:flex-row items-center gap-4 self-start">
                            <input
                                type="file"
                                id="cover"
                                name="cover"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="cover" className="bg-gray-700 rounded-full p-2 cursor-pointer text-nowrap">
                                Upload Cover Image
                            </label>
                            {imageSrc && (
                                <button
                                    onClick={handleRemoveImage}
                                    className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        {imageSrc ? (
                            <div className="w-full rounded-xl bg-white overflow-hidden">
                                <img
                                    src={imageSrc as string}
                                    alt="Cover Photo"
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-[400px] bg-gray-300 flex items-center justify-center rounded-xl">
                                <p className="text-gray-600">Cover Image Goes Here</p>
                            </div>
                        )}
                        <input
                            type="text"
                            name="caption"
                            value={formState.caption}
                            placeholder="Caption..."
                            className="bg-gray-700 rounded-full px-4 py-4 w-[40%] min-w-[215px] self-center"
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="article"
                            value={formState.article}
                            placeholder="Write your article here..."
                            className="bg-gray-700 rounded-xl w-full h-[300px] p-2 customScrollbar resize-none"
                            onChange={handleInputChange}
                        />
                        <div className="flex gap-4 w-full justify-end">
                            <button className="bg-white rounded-full text-black font-semibold font-textmedium px-2 sm:px-12 h-10 w-20 sm:w-fit" onClick={() => setFormState({
                                article: '',
                                caption: '',
                                description: '',
                                title: '',
                                image: '',
                            })}>Clear</button>
                            <button className="bg-white rounded-full text-black font-semibold font-textmedium px-2 sm:px-12 h-10 w-20 sm:w-fit" onClick={submitArticle}>Submit</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};
