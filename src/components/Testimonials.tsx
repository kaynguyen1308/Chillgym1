import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Review = {
  name: string;
  rating: number;
  date: string;
  review: string;
  source: string;
};

const reviews: Review[] = [
  {
    name: 'MINH ANH',
    rating: 5,
    date: 'THÁNG 05, 2024',
    review: 'Không gian sạch, thoáng và mọi người ở đây rất thân thiện. Mình tập đều hơn từ khi bắt đầu tại Chill Gym.',
    source: 'Google Review',
  },
  {
    name: 'QUỐC HUY',
    rating: 5,
    date: 'THÁNG 04, 2024',
    review: 'Thiết bị đầy đủ, không quá đông và được hướng dẫn rất tận tình. Một nơi dễ duy trì thói quen tập luyện.',
    source: 'Google Review',
  },
  {
    name: 'THẢO NGUYÊN',
    rating: 5,
    date: 'THÁNG 03, 2024',
    review: 'HLV luôn để ý đến từng buổi tập và điều chỉnh bài phù hợp. Mình cảm thấy tự tin hơn rất nhiều.',
    source: 'Google Review',
  },
  {
    name: 'TẤN PHÁT',
    rating: 5,
    date: 'THÁNG 02, 2024',
    review: 'Phòng tập có năng lượng tốt, nhân viên hỗ trợ nhanh và không gian khiến mình muốn quay lại mỗi ngày.',
    source: 'Google Review',
  },
  {
    name: 'NGỌC HÂN',
    rating: 5,
    date: 'THÁNG 01, 2024',
    review: 'Mình thích sự riêng tư và cách mọi người tập trung vào mục tiêu của mình. Trải nghiệm rất dễ chịu.',
    source: 'Google Review',
  },
  {
    name: 'ĐỨC ANH',
    rating: 5,
    date: 'THÁNG 12, 2023',
    review: 'Đội ngũ nhiệt tình, không gian hiện đại và lịch tập linh hoạt. Rất phù hợp cho người mới bắt đầu.',
    source: 'Google Review',
  },
];

const duplicatedReviews = [...reviews, ...reviews, ...reviews];

function getVisibleReviews(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 760) return 1;
  if (window.innerWidth <= 1080) return 2;
  return 3;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Testimonials() {
  const [visibleReviews, setVisibleReviews] = useState(getVisibleReviews);
  const [activeIndex, setActiveIndex] = useState(reviews.length);
  const [slideStep, setSlideStep] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const introRef = useReveal<HTMLDivElement>();
  const summaryRef = useReveal<HTMLDivElement>();
  const carouselRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    const updateLayout = () => {
      setVisibleReviews(getVisibleReviews());
      const viewport = viewportRef.current;
      if (!viewport) return;
      const gap = window.innerWidth <= 760 ? 12 : 18;
      setSlideStep((viewport.clientWidth - gap * (getVisibleReviews() - 1)) / getVisibleReviews() + gap);
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const moveNext = () => setActiveIndex((index) => index + 1);
  const movePrevious = () => setActiveIndex((index) => index - 1);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragStart(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    const distance = event.clientX - dragStart;
    if (Math.abs(distance) > 45) {
      if (distance < 0) moveNext();
      else movePrevious();
    }
    setDragStart(null);
  };

  const handleTransitionEnd = () => {
    if (activeIndex >= reviews.length * 2) {
      setIsJumping(true);
      setActiveIndex((index) => index - reviews.length);
      requestAnimationFrame(() => setIsJumping(false));
    }
    if (activeIndex < reviews.length) {
      setIsJumping(true);
      setActiveIndex((index) => index + reviews.length);
      requestAnimationFrame(() => setIsJumping(false));
    }
  };

  const selectReview = (index: number) => setActiveIndex(reviews.length + index);
  const currentDot = ((activeIndex % reviews.length) + reviews.length) % reviews.length;

  return (
    <section className="testimonials-section" id="danh-gia" aria-labelledby="testimonials-heading">
      <div className="testimonials-intro reveal" ref={introRef}>
        <p className="section-kicker">ĐÁNH GIÁ THỰC TỪ HỌC VIÊN</p>
        <h2 id="testimonials-heading">KẾT QUẢ THỰC.<br />CẢM NHẬN THỰC.</h2>
        <p className="testimonials-tagline">Những chia sẻ từ học viên tại Chill Gym.</p>
      </div>

      <div className="google-summary reveal" ref={summaryRef}>
        <p className="google-label">Google Reviews</p>
        <div className="google-rating-row">
          <strong>4.9</strong>
          <span className="google-stars" aria-label="5 trên 5 sao">★★★★★</span>
          <span className="google-count">(57+)</span>
        </div>
        <p className="google-support">Dựa trên đánh giá từ học viên tại Chill Gym.</p>
        <a className="button button-secondary google-cta" href="#reviews-list">XEM TẤT CẢ ĐÁNH GIÁ</a>
      </div>

      <div className="reviews-carousel reveal" ref={carouselRef}>
        <div
          className="reviews-viewport"
          id="reviews-list"
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setDragStart(null)}
          onPointerLeave={() => setDragStart(null)}
        >
          <div
            className={`reviews-track ${isJumping ? 'is-jumping' : ''}`}
            style={{ transform: `translate3d(-${activeIndex * slideStep}px, 0, 0)`, '--reviews-visible': visibleReviews } as React.CSSProperties}
            onTransitionEnd={handleTransitionEnd}
          >
            {duplicatedReviews.map((review, index) => (
              <article className="review-card" key={`${review.name}-${index}`}>
                <div className="review-card-top">
                  <span className="review-stars" aria-label={`${review.rating} trên 5 sao`}>{'★'.repeat(review.rating)}</span>
                </div>
                <p className="review-text">{review.review}</p>
                <footer className="review-meta">
                  <strong>{review.name}</strong>
                  <span>{review.source}</span>
                  <time>{review.date}</time>
                </footer>
              </article>
            ))}
          </div>
        </div>

        <div className="reviews-controls">
          <button type="button" onClick={movePrevious} aria-label="Đánh giá trước">
            <ArrowLeft size={18} strokeWidth={1.4} />
          </button>
          <div className="review-dots" aria-label="Chọn đánh giá">
            {reviews.map((review, index) => (
              <button
                type="button"
                key={review.name}
                className={index === currentDot ? 'is-active' : ''}
                onClick={() => selectReview(index)}
                aria-label={`Xem đánh giá ${index + 1}`}
                aria-current={index === currentDot ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={moveNext} aria-label="Đánh giá tiếp theo">
            <ArrowRight size={18} strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
