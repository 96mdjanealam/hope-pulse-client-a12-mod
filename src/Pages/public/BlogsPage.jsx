import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ArrowRight } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";

const PAGE_LIMIT = 9;

const stripHtmlTags = (html = "") => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);
  const axiosPublic = useAxiosPublic();

  const { data: response, isLoading } = useQuery({
    queryKey: ["publishedBlogs", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/publishedBlogs?page=${page}&limit=${PAGE_LIMIT}`
      );
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const blogs = Array.isArray(response) ? response : response?.data || [];
  const pagination = Array.isArray(response) ? null : response?.pagination;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Community Blog"
        subtitle="Stories, health tips, and blood donation awareness articles."
      />

      {isLoading ? (
        <LoadingSpinner label="Loading articles..." />
      ) : blogs.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No published articles yet"
          description="Check back soon for stories and blood donation resources."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              const plainText = stripHtmlTags(blog.content);
              return (
                <Card
                  key={blog._id}
                  padding="p-0"
                  className="flex flex-col overflow-hidden transition-shadow hover:shadow-md"
                >
                  <img
                    src={blog.thumbnailUrl}
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
                        {blog.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {plainText}
                      </p>
                    </div>
                    <div className="mt-5">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedBlog(blog)}
                      >
                        Read Article
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      )}

      <Modal
        open={Boolean(selectedBlog)}
        onClose={() => setSelectedBlog(null)}
        title={selectedBlog?.title || ""}
        maxWidth="max-w-2xl"
      >
        {selectedBlog && (
          <div className="space-y-4">
            <img
              src={selectedBlog.thumbnailUrl}
              alt={selectedBlog.title}
              className="h-56 w-full rounded-xl object-cover"
            />
            <div
              className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
