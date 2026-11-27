import React, { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import Swal from "sweetalert2";
import { PlusCircle } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

export default function AddBlogPage({ placeholder = "Write your article..." }) {
  const editor = useRef(null);
  const fileInputRef = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
    }),
    [placeholder]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnail) return;

    const formData = new FormData();
    formData.append("image", thumbnail);

    try {
      setIsUploading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const formDataDB = {
        title,
        thumbnailUrl: response?.data?.data?.display_url,
        content,
        status: "draft",
      };

      const res = await axiosSecure.post("/createBlog", formDataDB);
      if (res.status === 200) {
        setTitle("");
        setThumbnail(null);
        setContent("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        Swal.fire({
          icon: "success",
          title: "Blog created as draft!",
          showConfirmButton: false,
          timer: 1400,
        });
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to create blog",
        text: "Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Add New Blog"
        subtitle="Draft an article for review and publication."
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="blog-title"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Title
            </label>
            <input
              id="blog-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the blog title"
              required
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="blog-thumbnail"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Thumbnail Image
            </label>
            <input
              id="blog-thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              ref={fileInputRef}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-rose-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-rose-700"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Content
            </label>
            <div className="overflow-hidden rounded-xl border border-slate-300">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={isUploading}>
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              {isUploading ? "Creating..." : "Create Blog"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
