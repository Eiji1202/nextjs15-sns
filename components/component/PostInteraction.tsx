"use client"
import { likeAction } from "@/lib/actions";
import { Button } from "../ui/button";
import { HeartIcon, MessageCircleIcon, Share2Icon } from "./Icons";
import { useOptimistic } from "react";
import { useAuth } from "@clerk/nextjs";

type Props = {
  postId: string;
  /**
   * ユーザーIDの配列
   */
  likes: string[];
  repliesCount: number;
}

type LikeState = {
  likesCount: number;
  isLiked: boolean;
}

export default function PostInteraction(props: Props) {
  const { postId, likes, repliesCount } =  props;

  const {userId} = useAuth();
  if(!userId) {
    throw new Error("ユーザーが見つかりませんでした。");
  }

  const initialState: LikeState = {
    likesCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  }

  const [optimisticLike, addOptimisticLike] = useOptimistic<LikeState, void>(
    initialState,
    (currentState) => ({
      likesCount: currentState.isLiked ? currentState.likesCount - 1 : currentState.likesCount + 1,
      isLiked: !currentState.isLiked,
    })
  )

  const handleLikeSubmit = async () => {
    try {
      addOptimisticLike();
      await likeAction(postId);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-0.5">
        <form action={handleLikeSubmit}>
          <Button variant="ghost" size="icon">
            <HeartIcon className={`h-5 w-5 ${optimisticLike.isLiked ? "text-destructive" : "text-muted-foreground"}`} />
          </Button>
        </form>
        <span className={`${optimisticLike.isLiked ? "text-destructive" : "text-muted-foreground"}`}>{optimisticLike.likesCount}</span>
      </div>
      <div className="flex items-center gap-0.5">
        <Button variant="ghost" size="icon">
          <MessageCircleIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
        <span className="text-muted-foreground">{repliesCount}</span>
      </div>
      <Button variant="ghost" size="icon">
        <Share2Icon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  )
}
