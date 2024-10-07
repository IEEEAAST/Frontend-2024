export default interface UserData {
    firstname: string;
    lastname: string;
    email: string;
    imgurl: string;
    mobile: string;
    roles?: string[];
    desc: string;
    likes: likes;
    followers: string[];
    following: following;
}
interface likes {
    articles?: string[];
    events?: string[];
}
interface following{
    events: string[];
    users: string[];
}