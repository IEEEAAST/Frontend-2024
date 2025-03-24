import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { toggleFollow } from '../../utils';

interface FollowButtonProps {
    userData: any;
    selectedUserData: any;
    id: string;
    userId: string;
    setSelectedUserData: (data: any) => void;
    setUserData: (data: any) => void;
    className?: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
    userData,
    selectedUserData,
    id,
    userId,
    setSelectedUserData,
    setUserData,
    className = "",

}) => {

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    
      useEffect(() => {
        if (auth.currentUser) {
          setIsEmailVerified(auth.currentUser.emailVerified);
        }
      }, [auth.currentUser]);
      const canFollow=(userId&&isEmailVerified)?true:false;
    return (
        <button
            className={`defaultButton ${className}`}
            onClick={() => {
                if (userData && selectedUserData && id && userId) {
                    toggleFollow(selectedUserData, userData, id, userId, setSelectedUserData, setUserData);
                }
            }}
        >
            {canFollow ? (
                userId && selectedUserData?.followers.includes(userId) ? (
                    "Unfollow"
                ) : (
                    "Follow"
                )
            ) : (
                "Verify Email to Follow"
            )}
        </button>
    );
};
