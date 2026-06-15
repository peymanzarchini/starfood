import { Star, User as UserIcon, Lock } from "lucide-react";
import { cn } from "@/libs/utils";
import { Link } from "react-router-dom";
import type { ApiPaginatedResponse } from "@/types";
import type { ProductReviewsBody } from "../types";
import { ReviewForm } from "./ReviewForm";
import { useAuth } from "@/modules/auth";

interface ProductReviewsProps {
  productId: number;
  data: ApiPaginatedResponse<ProductReviewsBody> | undefined;
  canReview: boolean;
}

export const ProductReviews = ({ productId, data, canReview }: ProductReviewsProps) => {
  const { isAuthenticated } = useAuth();

  const reviews = data?.body.reviews || [];
  const stats = data?.body.stats;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
          <h5 className="font-black text-3xl text-text-main">{stats?.averageRating || "0.0"}</h5>
          <p className="text-text-muted font-bold text-sm">Average Rating</p>
          <div className="flex items-center gap-1 mt-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(stats?.averageRating || 0) ? "#f59e0b" : "none"}
                className="text-amber-500"
              />
            ))}
          </div>
          <p className="text-xs text-text-muted font-medium">
            {stats?.totalReviews || 0} verified reviews
          </p>
        </div>

        {isAuthenticated ? (
          canReview ? (
            <ReviewForm productId={productId} />
          ) : (
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 text-center">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <UserIcon size={20} />
              </div>
              <h5 className="font-black text-text-main mb-2">Already Reviewed</h5>
              <p className="text-text-muted text-sm font-medium">
                You have already submitted a review for this product.
              </p>
            </div>
          )
        ) : (
          <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Lock size={20} />
            </div>
            <h5 className="font-black text-text-main mb-2">Want to review?</h5>
            <p className="text-text-muted text-sm mb-6 font-medium">
              Please login to your account to share your feedback.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20"
            >
              Login Now
            </Link>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-20 bg-bg-soft dark:bg-dark-bg-soft rounded-[3rem]">
            <p className="text-text-muted font-bold">No approved reviews yet.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <UserIcon size={24} />
                  </div>
                  <div>
                    <h6 className="font-black text-text-main capitalize">
                      {review.user.firstName}
                    </h6>
                    <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                      Verified Buyer
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        i < review.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-slate-200 dark:text-slate-700",
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-text-muted font-medium leading-relaxed italic">
                "{review.comment}"
              </p>
              <p className="text-[10px] text-text-muted mt-4 font-bold uppercase">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
