/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { reviewsApi } from "@/api/services/review.service";
import { cn } from "@/libs/utils";
import { reviewSchema, type ReviewFormValues } from "../../validation";

interface ReviewFormProps {
  productId: number;
  onSuccess: () => void;
}

const ReviewForm = ({ productId, onSuccess }: ReviewFormProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  const selectedRating = watch("rating");

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      setIsSubmitting(true);
      await reviewsApi.create({
        productId,
        rating: data.rating,
        comment: data.comment,
      });
      toast.success("Review submitted! It will be visible after admin approval.");
      reset();
      onSuccess();
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
      <h4 className="text-xl font-black text-text-main mb-6">Write a Review</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Star Rating Selector */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-text-muted ml-1">How was the food?</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setValue("rating", star, { shouldValidate: true })}
                className="transition-transform active:scale-90"
              >
                <Star
                  size={32}
                  className={cn(
                    "transition-colors duration-200",
                    (hoveredRating || selectedRating) >= star
                      ? "text-amber-500 fill-amber-500"
                      : "text-slate-200 dark:text-slate-700",
                  )}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-xs font-bold mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* Comment Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-text-muted ml-1">Your Experience</label>
          <textarea
            {...register("comment")}
            placeholder="Tell us about the taste, delivery, and service..."
            rows={4}
            className="w-full p-5 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-sm resize-none"
          />
          {errors.comment && (
            <p className="text-red-500 text-xs font-bold mt-1">{errors.comment.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-x-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Send size={18} /> Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
