"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  image: string;
  title: string;
  short_description: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  function searchPost() {
    if (inputRef.current) {
      setSearch(true);
      fetch(`http://localhost:3000/api/posts?name=${inputRef.current.value}`)
        .then((res) => res.json())
        .then((res) => setPosts(res))
        .finally(() => setSearch(false));
    }
  }

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Team-1's Blog</h2>
        <p>Know the latest news !!! Aware of what is happening around !!! Stay connected to the word : </p>
      </main>
      <div className="flex justify-end px-4">
        <input ref={inputRef} type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button onClick={searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">
          {search ? '...' : 'Search'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link href={`/post/${post._id}`} key={post._id}>
            <div className="border border-gray-200 p-4">
              <img className="w-full h-60 object-cover mb-4" src={post.image} alt="Post Image" />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
        {!posts.length && inputRef.current?.value && (
          <p>No post available for the query: <b>{inputRef.current.value}</b></p>
        )}
      </div>
    </>
  );
}
