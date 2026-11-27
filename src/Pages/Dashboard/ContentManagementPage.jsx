import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, FileText, Globe, EyeOff } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";

const PAGE_LIMIT = 8;

export default function ContentManagementPage() {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allBlogs?page=${page}&limit=${PAGE_LIMIT}`
      );
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const blogs = Array.isArray(response) ? response : response?.data || [];
  const pagination = Array.isArray(response) ? null : response?.pagination;

  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/blog-status-update/${id}`, { status });
    await refetch();
  };

  return (
    <div>
      <PageHeader
        title="Content Management"
        subtitle="Create, review, and publish community blog articles."
        action={
          <Link to="/dashboard/content-management/add-blog">
            <Button variant="primary" size="sm">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Add Blog
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSpinner label="Loading blog posts..." />
      ) : blogs.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No blog posts yet"
          description="Create your first blog article to share awareness and community stories."
          action={
            <Link to="/dashboard/content-management/add-blog">
              <Button variant="primary" size="sm">
                <PlusCircle className="h-4 w-4" aria-hidden="true" />
                Add Blog
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <Card key={blog._id} padding="p-0" className="overflow-hidden">
                <img
                  src={blog.thumbnailUrl}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {blog.title}
                    </h2>
                    <Badge>{blog.status}</Badge>
                  </div>

                  <div
                    className="prose prose-slate mt-3 line-clamp-3 max-w-none text-sm text-slate-600"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {userInfo?.role === "Admin" && (
                    <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
                      {blog.status === "draft" ? (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() =>
                            handleStatusChange(blog._id, "published")
                          }
                        >
                          <Globe className="h-4 w-4" aria-hidden="true" />
                          Publish
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleStatusChange(blog._id, "draft")}
                        >
                          <EyeOff className="h-4 w-4" aria-hidden="true" />
                          Unpublish
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
