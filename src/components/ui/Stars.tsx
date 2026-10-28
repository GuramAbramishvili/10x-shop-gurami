interface StarsProps {
  rating: number; // 0-5, may be fractional
}

export default function Stars({ rating }: StarsProps) {
  const rounded = Math.round(rating);
  return (
    <span role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`} className="whitespace-nowrap text-warn">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} aria-hidden="true" className={n <= rounded ? "" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  );
}
