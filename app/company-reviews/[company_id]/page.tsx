"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarInput } from "@/components/common";
import { ChevronRight } from "lucide-react";

interface Review {
  id: number;
  poster: string;
  content: string;
  rating: number;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    poster: "Nhân viên quèn",
    content: "Yody muôn năm, yody vô địch!!!!",
    rating: 5,
    date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
  },
  {
    id: 2,
    poster: "Mr.H",
    content: "Bán áo mạnh lên ae ơi",
    rating: 4,
    date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

interface Reply {
  id: number;
  reviewId: number;
  poster: string;
  content: string;
  date: string;
}

function AutoResizeTextarea(props: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [props.value]);

  return <Textarea ref={textareaRef} {...props} />;
}

function AddReviewSection({
  handleAddReview,
}: {
  handleAddReview: (newReview: Review) => void;
}) {
  const [newReview, setNewReview] = useState({
    id: Math.random(),
    poster: "Nam Nguyen",
    content: "",
    rating: 0,
    date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
  });

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const onAddReview = () => {
    if (newReview.rating && newReview.poster && newReview.content) {
      handleAddReview(newReview);
      setNewReview({
        id: Math.random(),
        poster: "Nam Nguyen",
        content: "",
        rating: 0,
        date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded mb-8">
      <div className="flex items-center mb-4 gap-4">
        <h1 className="text-xl font-bold">Thêm Review</h1>
        <StarInput value={newReview.rating} onChange={handleRatingChange} />
      </div>
      <AutoResizeTextarea
        placeholder="Bạn nghĩ gì về Yody?"
        value={newReview.content}
        onChange={(e) =>
          setNewReview({ ...newReview, content: e.target.value })
        }
        className="p-2 mb-2 w-full border border-gray-300 rounded"
      />
      <Button onClick={onAddReview} className="text-white p-2 rounded w-full">
        Gửi review
      </Button>
    </div>
  );
}

function ReviewItem({
  review,
  replies,
  handleAddReply,
}: {
  review: Review;
  replies: Reply[];
  handleAddReply: (reply: Reply) => void;
}) {
  const [newReply, setNewReply] = useState({
    id: Math.random(),
    reviewId: review.id,
    poster: "Nam Nguyen",
    content: "",
    date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
  });

  const onAddReply = () => {
    if (newReply.poster && newReply.content) {
      handleAddReply(newReply);
      setNewReply({
        id: Math.random(),
        reviewId: review.id,
        poster: "Nam Nguyen",
        content: "",
        date: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded">
      <div className="flex gap-2 items-center">
        <h2 className="text-xl font-bold">{review.poster}</h2>
        <StarInput value={review.rating} />
      </div>
      <p className="text-gray-500 text-sm mb-4">{review.date}</p>
      <p>{review.content}</p>
      <div className="mt-4 flex gap-2">
        <AutoResizeTextarea
          placeholder="Your reply"
          value={newReply.content}
          onChange={(e) =>
            setNewReply({ ...newReply, content: e.target.value })
          }
          className="p-2 mb-2 w-full border border-gray-300 rounded"
        />
        <Button onClick={onAddReply} className="text-white p-2 rounded w-10">
          <ChevronRight />
        </Button>
      </div>
      {replies.map((reply) => (
        <div
          key={reply.id}
          className="ml-8 mt-2 border-l-2 border-gray-300 pl-4"
        >
          <h3 className="text-lg font-bold">{reply.poster}</h3>
          <p className="text-gray-500 text-sm mb-4">{reply.date}</p>
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
}

export default function CompanyReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [replies, setReplies] = useState<Reply[]>([]);

  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  const handleAddReply = (newReply: Reply) => {
    setReplies([newReply, ...replies]);
  };

  const params = useParams<{ tag: string; item: string }>();

  return (
    <div className="p-4 w-1/2 m-auto">
      <h1 className="text-2xl font-bold mb-4">Yody Review</h1>
      <AddReviewSection handleAddReview={handleAddReview} />
      <div className="mb-6">
        {reviews.map((review) => (
          <div key={review.id}>
            <ReviewItem
              review={review}
              replies={replies.filter((reply) => reply.reviewId === review.id)}
              handleAddReply={handleAddReply}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
