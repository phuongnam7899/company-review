interface StarInputProps {
  value: number;
  onChange?: (value: number) => void;
}

export function StarInput({ value, onChange }: StarInputProps) {
  const handleRatingChange = (rating: number) => {
    onChange && onChange(rating);
  };
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRatingChange(star)}
          className={`cursor-pointer text-2xl ${
            value >= star ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
