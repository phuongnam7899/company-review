"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AutoResizeTextarea, StarInput } from "@/components/common";
import { ChevronRight, EllipsisVertical, LogOut, UserPen } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/authSlice";
import dayjs from "dayjs";
import Link from "next/link";
import { RootState } from "@/store";
import { User } from "@/store/authSlice";
import { DropdownMenu } from "@/components/common/DropdownMenu";

interface Review {
  id: string;
  poster: string;
  content: string;
  rating: number;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    poster: "Nhân viên quèn",
    content: "Yody muôn năm, yody vô địch!!!!",
    rating: 5,
    date: "2024-12-12T12:00:00.000Z",
  },
  {
    id: "2",
    poster: "Mr.H",
    content: "Bán áo mạnh lên ae ơi",
    rating: 4,
    date: "2024-12-12T12:00:00.000Z",
  },
];

function getNewId(): string {
  return Math.random().toString(36).substring(7);
}

interface Reply {
  id: string;
  reviewId: string;
  poster: string;
  content: string;
  date: string;
}

function AddReviewSection({
  handleAddReview,
}: {
  handleAddReview: (newReview: Review) => void;
}) {
  const currentUser = useSelector<RootState>(
    (state) => state.auth.currentUser
  ) as User | null;
  const id = getNewId();
  const [newReview, setNewReview] = useState({
    id,
    poster: currentUser?.displayName || "",
    content: "",
    rating: 0,
    date: new Date().toISOString(),
  });

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const onAddReview = () => {
    if (newReview.rating && newReview.poster && newReview.content) {
      handleAddReview(newReview);
      setNewReview({
        id: getNewId(),
        poster: "Nam Nguyen",
        content: "",
        rating: 0,
        date: new Date().toISOString(),
      });
    }
  };

  const filled = newReview.rating && newReview.poster && newReview.content;

  if (!currentUser) {
    return <></>;
  }

  return (
    <div className="border border-gray-300 p-4 rounded mb-8">
      <div className="flex items-center mb-4 gap-4">
        <h1 className="text-xl font-bold">Thêm Review</h1>
        <StarInput value={newReview.rating} onChange={handleRatingChange} />
      </div>
      <AutoResizeTextarea
        placeholder="Bạn nghĩ gì về Yody?"
        value={newReview.content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNewReview({ ...newReview, content: e.target.value })
        }
        className="p-2 mb-2 w-full border border-gray-300 rounded"
      />
      <Button
        onClick={onAddReview}
        disabled={!filled}
        className="text-white p-2 rounded w-full"
      >
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
  const id = getNewId();
  const [newReply, setNewReply] = useState({
    id,
    reviewId: review.id,
    poster: "Nam Nguyen",
    content: "",
    date: new Date().toISOString(),
  });

  const onAddReply = () => {
    if (newReply.poster && newReply.content) {
      handleAddReply(newReply);
      setNewReply({
        id: getNewId(),
        reviewId: review.id,
        poster: "Nam Nguyen",
        content: "",
        date: new Date().toISOString(),
      });
    }
  };

  const filledReply = newReply.poster && newReply.content;

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded">
      <div className="flex gap-2 items-center">
        <h2 className="text-xl font-bold">{review.poster}</h2>
        <StarInput value={review.rating} />
      </div>
      <p className="text-gray-500 text-sm mb-4">
        {" "}
        {dayjs(review.date).format("HH:mm DD/MM/YYYY")}
      </p>
      <p>{review.content}</p>
      <div className="mt-4 flex gap-2">
        <AutoResizeTextarea
          placeholder="Your reply"
          value={newReply.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNewReply({ ...newReply, content: e.target.value })
          }
          className="p-2 mb-2 w-full border border-gray-300 rounded"
        />
        <Button
          onClick={onAddReply}
          disabled={!filledReply}
          className="text-white p-2 rounded w-10"
        >
          <ChevronRight />
        </Button>
      </div>
      {replies.map((reply) => (
        <div
          key={reply.id}
          className="ml-8 mt-2 border-l-2 border-gray-300 pl-4"
        >
          <h3 className="text-lg font-bold">{reply.poster}</h3>
          <p className="text-gray-500 text-sm mb-4">
            {dayjs(reply.date).format("HH:mm DD/MM/YYYY")}
          </p>
          <p>{reply.content}</p>
        </div>
      ))}
    </div>
  );
}

export default function CompanyReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [replies, setReplies] = useState<Reply[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector<RootState>(
    (state) => state.auth.currentUser
  ) as User | null;

  const handleAddReview = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  const handleAddReply = (newReply: Reply) => {
    setReplies([newReply, ...replies]);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    router.push("/login");
  };

  const params = useParams<{ tag: string; item: string }>();

  return (
    <div className="p-4 w-1/2 m-auto">
      <div className="flex items-center justify-between  mb-4">
        <div className="flex gap-4 items-center">
          <img
            src={
              "https://play-lh.googleusercontent.com/xH4QFNdQcEOELtR2XyDxhMCka1q5PTEgY40LSGYVoT7fkbmAnPfA8LFYac7hmolnCRg=w240-h480-rw"
            }
            alt={`Yody logo`}
            className="w-12 h-12 mb-2 rounded"
          />
          <h1 className="text-2xl font-bold">Yody Review</h1>
        </div>
        {currentUser ? (
          <div className="flex gap-2 items-center font-bold">
            {currentUser.displayName}
            <DropdownMenu
              menuItemsGroups={[
                [
                  { label: "Đổi tên hiển thị", icon: <UserPen /> },
                  {
                    label: "Đăng xuất",
                    icon: <LogOut className="text-red-500" />,
                    onClick: handleLogoutClick,
                  },
                ],
              ]}
              align="end"
            >
              <Button
                variant="default"
                className="text-white p-2 rounded"
                onClick={handleLogoutClick}
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenu>
          </div>
        ) : (
          <Link href="/login">
            <Button className="text-white p-2 rounded">
              Đăng nhập để viết review
            </Button>
          </Link>
        )}
      </div>
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
