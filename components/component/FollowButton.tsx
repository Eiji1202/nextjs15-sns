"use client"

import React, { useOptimistic } from 'react'
import { Button } from '../ui/button'
import { followAction } from '@/lib/actions'

type Props = {
  isCurrentUser: boolean
  isFollowing: boolean
  userId: string
}

export default function FollowButton(props: Props) {
  const { isCurrentUser, isFollowing, userId } = props;

  const [optimisticFollow, addOptimisticFollow] = useOptimistic<{ isFollowing: boolean },void>({isFollowing}, (currentState) => ({
    isFollowing: !currentState.isFollowing,
  }))

  const getButtonText = () => {
    if(isCurrentUser) {
      return 'プロフィール編集'
    }

    if(optimisticFollow.isFollowing) {
      return 'フォロー中'
    }

    return 'フォローする'
  }

  const getButtonVariant = () => {
    if(isCurrentUser) {
      return 'secondary'
    }

    if(optimisticFollow.isFollowing) {
      return 'outline'
    }

    return 'default'
  }

  const handleFollowAction = async () => {
    if(isCurrentUser) return

    try {
      addOptimisticFollow();
      await followAction(userId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form action={handleFollowAction}>
      <Button variant={getButtonVariant()} className="w-full">{getButtonText()}</Button>
    </form>
  )
}
