// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export default function ContentManagement() {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useContext(AuthContext);

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axiosSecure.get("/allBlogs");
      return response.data;
    },
  });

  const handlePublish = (id) => {
    axiosSecure
      .patch(`/blog-status-update/${id}`, { status: "published" })
      .then(() => {
       
        refetch();
      });
  };
  const handleUnpublish = (id) => {
    
    axiosSecure
      .patch(`/blog-status-update/${id}`, { status: "draft" })
      .then(() => {
       
        refetch();
      });
  };

  return (
    <div>
      <div className="flex justify-end">
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-success btn-sm">
            Add blog
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-4">
        {blogs.map((blog, index) => (
          <div key={index} className="border rounded-lg shadow p-4 mb-4 bg-white">
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="w-full h-52 object-cover rounded"
            />
            <div className="flex items-center gap-4 mt-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p
                className={`font-semibold text-sm px-3 py-1 ${
                  blog.status === "draft" ? "bg-gray-300" : "bg-green-300"
                }  rounded-full w-fit`}
              >
                {blog.status}
              </p>
            </div>

            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
            {userInfo?.role === "Admin" && (
              <div className="flex gap-2 mt-4">
                {blog.status === "draft" ? (
                  <button
                    onClick={() => handlePublish(blog._id)}
                    className="btn btn-success btn-sm"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnpublish(blog._id)}
                    className="btn btn-error btn-sm"
                  >
                    Unpublish
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
