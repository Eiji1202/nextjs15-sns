import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { ClockIcon } from "./Icons";
import PostInteraction from './PostInteraction';
import Link from 'next/link';
import { Post as PostType, User } from "@prisma/client";

// 投稿の型定義
type PostWithRelations = PostType & {
  author: User;
  likes: { userId: string }[];
  _count: {
    replies: number;
  };
}

type Props = {
  post: PostWithRelations;
}

export default async function Post(props: Props) {
  const { post } = props;

  return (
    <div
      key={post.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
    >
      <div className="flex items-center gap-4 mb-4">
        <Link href={`/profile/${post.author.id}`}>
          <Avatar className="w-10 h-10">
            <AvatarImage src={`${post.author.image}`} />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h3 className="text-lg font-bold">{post.author.name}</h3>
          {/* <p className="text-muted-foreground">{post.author.name}</p> */}
        </div>
      </div>
      <div className="space-y-2">
        <p>{post.content}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <PostInteraction
            postId={post.id}
            likes={post.likes.map((like: any) => like.userId)}
            repliesCount={post._count.replies}
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <ClockIcon className="h-5 w-5" />
          <span>{post.createdAt.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
