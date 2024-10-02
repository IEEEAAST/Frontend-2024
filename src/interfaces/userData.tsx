export default interface UserData {
    firstname: string;
    lastname: string;
    email: string;
    imgurl: string;
    mobile: string;
    roles?: string[];
    desc: string;
    likes: likes;
}
interface likes {
    articles?: string[];
    events?: string[];
}