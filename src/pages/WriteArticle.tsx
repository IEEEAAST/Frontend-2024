import { useState, useContext, useEffect } from "react";
import { NavBar } from "../components/common/navbar.tsx";
import { UserContext } from "../App.tsx";
import UserData from "../interfaces/userData";

export const WriteArticle = () => {
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [article, setArticle] = useState<string>('');
    const [imageAspectRatio, setImageAspectRatio] = useState<number>(1);
    const [userCanWrite, setUserCanWrite] = useState<boolean>(false);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        setUserCanWrite(userData?.roles?.includes("writer")|| userData?.roles?.includes("admin")||false);
        if (!userData) {
            window.location.href = "/signin";
        }

    }, [userData]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImageSrc(reader.result);
                    const img = new Image();
                    img.src = reader.result as string;
                    img.onload = () => {
                        setImageAspectRatio(img.width / img.height);
                    };
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageSrc(null);
        setImageAspectRatio(1);
        const fileInput = document.getElementById('cover') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        
      <>
        <NavBar />
        {userCanWrite&&
        <div className="pt-[100px]">
            <div className="flex flex-col items-center px-20 py-10 h-fit gap-4">
                <p className="self-start text-2xl sm:text-[40px] ">Let's write an article!</p>
                <input type="text" placeholder="Title..." className="bg-gray-700 rounded-full px-4 py-4 w-[40%] self-start"></input>
                <input type="text" placeholder="Description..." className="bg-gray-700 rounded-full px-4 py-4 w-[40%] self-start"></input>
                
                <div className="flex items-center gap-4 self-start">
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
                    <div className="w-[80%] relative" style={{ paddingBottom: `${(1 / imageAspectRatio) * 100}%` }}>
                        <img
                            src={imageSrc as string}
                            alt="Cover"
                            className="absolute top-0 left-0 w-full h-full object-contain rounded-xl"
                        />
                    </div>
                ) : (
                    <div className="w-[80%] h-[400px] bg-gray-300 flex items-center justify-center rounded-xl">
                        <p className="text-gray-600">Cover Image Goes Here</p>
                    </div>
                )}
                <input type="text" placeholder="Caption..." className="bg-gray-700 rounded-full px-4 py-4 w-[40%] self-start"></input>
                <textarea
                    placeholder="Write your article here..."
                    value={article}
                    className="bg-gray-700 rounded-xl w-[80%] h-[300px] p-2"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setArticle(event.target.value)}
                />
                <div className="flex self-end gap-4 px-[7vw]">
                    <button className="defaultButton" onClick={() => { setArticle(''); }}>Clear</button>
                    <button className="defaultButton">Submit</button>
                </div>
            </div>
        </div>
}
      </>
    );
};
