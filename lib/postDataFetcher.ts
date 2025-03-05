import { Prisma } from "@prisma/client";
import prisma from "./prisma";

type Props = {
  userId: string,
  username?: string,
}

export async function fetchPosts(props: Props) {
  const {userId, username} = props

  if(username) {
    return await prisma.post.findMany({
      where: {
        author: {
          name: username,
        }
      },
      include: {
        author: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  if(!username && userId) {
    const following = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    })
  
    const followingIds = following.map((follow) => follow.followingId);  
  
    return await prisma.post.findMany({
      where: {
        authorId: {
          in: [userId, ...followingIds],
        },
      },
      include: {
        author: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  // 何もなければ空の配列を返す
  return [];
}
