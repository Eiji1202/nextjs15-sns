"use server"

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

type AddPostActionResponse = {
  error: string | undefined;
  success: boolean;
}

export async function addPostAction(prevState: AddPostActionResponse, formData: FormData): Promise<AddPostActionResponse> {
  try {
    const { userId } = auth();

    if(!userId) {
      return {
        error: "ユーザーが見つかりませんでした。",
        success: false,
      }
    }

    const postText = formData.get("post") as string;
    const postTextSchema = z
      .string()
      .trim()
      .min(1, "投稿内容を入力してください")
      .max(100, "100文字以内で入力してください");

    const validatedPostText = postTextSchema.parse(postText);

    await prisma.post.create({
      data: {
        content: validatedPostText,
        authorId: userId,
      },
    });

    revalidatePath("/");

    return {
      error: undefined,
      success: true,
    }
  } catch (err) {
    if(err instanceof z.ZodError) {
      return {
        error: err.errors.map((e) => e.message).join(", "),
        success: false,
      }
    } else if (err instanceof Error) {
      return {
        error: err.message,
        success: false,
      }
    } else {
      return {
        error: "予期せぬエラーが発生しました。",
        success: false,
      }
    }
  }
}

export async function likeAction(postId: string) {
  try {
    const { userId } = auth();
    if(!userId) return;

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      }
    })

    if(existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        }
      })
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        }
      })
    }
    revalidatePath("/")
  } catch (err) {
    console.log(err);
  }
}

export async function followAction(userId: string) {
  try {
    const { userId: currentUserId } = auth();
    if(!currentUserId) return;

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      }
    })

    if(existingFollow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: userId,
          }
        }
      })
    } else {
      await prisma.follow.create({
        data: {
          followerId: currentUserId,
          followingId: userId,
        }
      })
    }
    revalidatePath(`profile/${userId}`);
  } catch (err) {
    console.log(err);
  }
}
