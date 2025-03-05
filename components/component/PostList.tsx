import { auth } from "@clerk/nextjs/server";
import { fetchPosts } from "@/lib/postDataFetcher";
import Post from "./Post";

type Props = {
  username?: string
}

export default async function PostList(props: Props) {
  const { username } = props
  const { userId } = auth();
  if(!userId) return;

  const posts = await fetchPosts({userId, username});

  return (
    <div className="space-y-4">
      {posts ? posts.map((post) => (
        <Post post={post} key={post.id}/>
      )) : (
        <p className="text-center text-muted-foreground">投稿がありません。</p>
      )}
    </div>
  );
}
