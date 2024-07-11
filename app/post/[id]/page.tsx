"use client"
import { useEffect, useState } from "react";

interface PostProps {
  params: {
    id: string;
  };
}

interface PostData {
  title: string;
  created_at_format: string;
  image: string;
  description: string;
}

export default function Post({ params }: PostProps) {
  const id = params.id;

  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/post/${id}`)
      .then((res) => res.json())
      .then((res) => setPost(res));
  }, [id]);

  return (
    <>
      {post && (
        <main className="container mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-500">{post.created_at_format}</p>
          <img src={post.image} alt="Post Image" className="my-4 w-150 h-80" />
          <p>{post.description}</p>
        </main>
      )}
    </>
  );
}
