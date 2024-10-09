import { arrayRemove, arrayUnion } from '@firebase/firestore';
import updateData from './firebase/updateData'; 
import ArticleData from './interfaces/ArticleData';
import { EventData } from './interfaces/EventData';
import userData from './interfaces/userData';
import { Events } from 'react-scroll';


export const toggleLike = async (
    item: EventData | ArticleData,
    userData: userData,
    userId: string,
    type: string,
    setUserData: Function,
) => {
    const collectionName = type === "article" ? "articles" : "events";
    if(!item.likedBy) throw new Error("LikedBy field not found in item! Please add it in firebase.");
    const liked = item.likedBy?.includes(userId);

    // Determine the updated likes for the user based on like status
    const updatedLikes = liked 
        ? (type === "article" 
            ? userData?.likes?.articles?.filter((like) => like !== item.id) 
            : userData?.likes?.events?.filter((like) => like !== item.id))
        : (type === "article" 
            ? [...(userData?.likes?.articles || []), item.id] 
            : [...(userData?.likes?.events || []), item.id]);

    try {
        // Update the user data locally
        const updatedUserLikes = {
            ...userData.likes,
            articles: type === "article" ? updatedLikes : userData.likes.articles,
            events: type === "article" ? userData.likes.events : updatedLikes
        };

        // Update the state with the new user likes
        setUserData({ ...userData, likes: updatedUserLikes });

        // Update user data in Firebase
        await updateData('users', userId, { likes: updatedUserLikes });

        // Check if item likes exist and update in Firebase
        if (item.likedBy !== undefined) {
            // Update item likes in Firebase
            await updateData(collectionName, item.id, { likedBy: liked ? arrayRemove(userId) : arrayUnion(userId) });
        }

        return true;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const toggleFollow = async (
    followed: userData,
    follower: userData,
    followedId: string,
    followerId: string,
    setFollowedData: Function,
    setFollowerData: Function,
)=>{
    const isfollowing = followed.followers?.includes(followerId);
    console.log(isfollowing)
        setFollowedData({...followed, followers:isfollowing? followed.followers.filter((user)=>{return user!= followerId}):[...followed.followers, followerId]})
        setFollowerData({...follower, following:{...follower.following, users:isfollowing?follower.following.users.filter((user)=>{return user!= followedId}): [...follower.following.users , followedId]}})
        const result = await updateData("users", followedId, { followers:isfollowing?arrayRemove(followerId):arrayUnion(followerId)});
        console.log(result);
        await updateData("users", followerId, {following:{events:follower.following.events, users: isfollowing?arrayRemove(followedId):arrayUnion(followedId)}});

}