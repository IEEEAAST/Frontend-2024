import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';
import { toggleFollow } from '../../utils';
import { Tooltip } from '@chakra-ui/react';

interface FollowButtonProps {
  targetUserData: any;
  currentUserData: any;
  targetUserId: string;
  currentUserId: string;
  setTargetFollowers?: (userId: string, updatedFollowers: string[]) => void; // Optional
  setCurrentFollowing?: (userId: string, updatedFollowing: string[]) => void; // Optional
  className?: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  targetUserData,
  currentUserData,
  targetUserId,
  currentUserId,
  setTargetFollowers,
  setCurrentFollowing,
  className = "",
}) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setIsEmailVerified(auth.currentUser.emailVerified);
    }
  }, [auth.currentUser]);

  const canFollow = currentUserId && isEmailVerified;

  const handleFollow = () => {
    if (canFollow) {
      toggleFollow(
        targetUserData,
        currentUserData,
        targetUserId,
        currentUserId,
        setTargetFollowers || (() => {}),
        setCurrentFollowing || (() => {}) // No-op functions if the setter functions are not provided
      );
    }
  };

  const buttonContent=<button
  className={`bg-white text-black text-[12pt] font-semibold font-[SF-Pro-Text-Medium] border-none cursor-pointer w-24 sm:w-[140px] h-[40px] rounded-full ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
  onClick={handleFollow}
  disabled={!canFollow}
>
    {currentUserId && targetUserData?.followers.includes(currentUserId) ? (
      "Unfollow"
    ) : (
      "Follow"
    )}
  
</button>

  return canFollow ? (
    buttonContent
  ) : (
    <Tooltip label={!currentUserId? "Please sign in to follow others.":!isEmailVerified?"Please verify your email to follow others.":""} shouldWrapChildren placement="auto">
      {buttonContent}
    </Tooltip>
  );
};
