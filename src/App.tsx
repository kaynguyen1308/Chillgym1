import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Leaf,
  Menu,
  Phone,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

const navItems = ['GIỚI THIỆU', 'BIẾN ĐỔI', 'DỊCH VỤ', 'HUẤN LUYỆN VIÊN', 'ĐÁNH GIÁ', 'ĐỊA CHỈ'];

const features = [
  { label: ['KHÔNG GIAN', 'THOÁNG MÁT'], icon: Leaf },
  { label: ['THIẾT BỊ', 'HIỆN ĐẠI'], icon: Dumbbell },
  { label: ['CỘNG ĐỒNG', 'TÍCH CỰC'], icon: Users },
  { label: ['AN TOÀN', 'VÀ CHUYÊN NGHIỆP'], icon: ShieldCheck },
];

const slideshowImages = [
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787475435/left.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787476521/inside4.png',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787476521/inside5.png',
];

const aboutImages = [
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787480771/FACILITY_1.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787480768/FACILITY_6.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787480767/FACILITY_4.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787480767/FACILITY_5.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787480766/FACILITY_3.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787480765/FACILITY_2.jpg',
];

const HERO_SLIDE_INTERVAL = 5000;

function getSlidesToShow(): number {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 640) return 1.25;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [aboutSlide, setAboutSlide] = useState(0);
  const [aboutSlidesToShow, setAboutSlidesToShow] = useState(getSlidesToShow);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % slideshowImages.length);
    }, HERO_SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [heroSlide]);

  useEffect(() => {
    const handleResize = () => setAboutSlidesToShow(getSlidesToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxSlide = aboutImages.length - aboutSlidesToShow;
    setAboutSlide((current) => Math.min(current, maxSlide));
  }, [aboutSlidesToShow]);

  const maxAboutSlide = Math.max(0, Math.floor(aboutImages.length - aboutSlidesToShow));

  const goToNextHeroSlide = () => setHeroSlide((prev) => (prev + 1) % slideshowImages.length);
  const goToNextAboutSlide = () => setAboutSlide((prev) => Math.min(prev + 1, maxAboutSlide));
  const goToPreviousAboutSlide = () => setAboutSlide((prev) => Math.max(prev - 1, 0));

  const handleCarouselPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragStart(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCarouselPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    const distance = event.clientX - dragStart;
    if (Math.abs(distance) > 45) {
      if (distance < 0) goToNextAboutSlide();
      else goToPreviousAboutSlide();
    }
    setDragStart(null);
  };

  return (
    <main className="site-page">
      <section className="hero-shell" id="top">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Chill Gym trang chủ">
            <span>CHILL</span>
            <strong>GYM</strong>
          </a>

          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Điều hướng chính">
            {navItems.map((item) => (
              <a
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                key={item}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-phone" href="tel:0704952969" aria-label="Gọi 070 495 2969">
              <Phone size={13} strokeWidth={1.6} />
              <span>070 495 2969</span>
            </a>
            <a className="header-cta" href="#dang-ky">
              ĐĂNG KÝ TẬP THỬ
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </header>

        <section className="hero-image-panel" aria-label="Không gian Chill Gym">
          <div className="hero-slideshow">
            {slideshowImages.map((src, index) => (
              <div
                className={`hero-slide ${index === heroSlide ? 'is-active' : ''}`}
                key={src}
                style={{ backgroundImage: `url('${src}')` }}
                aria-hidden={index !== heroSlide}
              />
            ))}
          </div>
          <div className="image-overlay" />
          <button className="hero-next" type="button" onClick={goToNextHeroSlide} aria-label="Ảnh tiếp theo">
            <ArrowRight size={22} strokeWidth={1.35} />
          </button>

          <div className="hero-copy">
            <p className="eyebrow">CHILL GYM</p>
            <h1>
              TẬP LUYỆN
              <br />
              THEO CÁCH
              <br />
              <em>CỦA BẠN.</em>
            </h1>
            <p className="hero-description">
              Không gian hiện đại, thoáng mát với cây xanh, thiết bị cao cấp và cộng đồng năng lượng tích cực.
              Chill nhưng không chill với mục tiêu của bạn.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#dang-ky">
                ĐĂNG KÝ TẬP THỬ <ArrowRight size={17} strokeWidth={1.7} />
              </a>
              <a className="button button-secondary" href="#tu-van">
                TƯ VẤN MIỄN PHÍ
              </a>
            </div>
          </div>

          <div className="feature-row" aria-label="Điểm nổi bật">
            {features.map(({ label, icon: Icon }) => (
              <div className="feature" key={label[0]}>
                <Icon className="feature-icon" size={25} strokeWidth={1.25} />
                <span>
                  {label[0]}
                  <br />
                  {label[1]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="video-panel" aria-label="Chill Gym daily vlog">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://res.cloudinary.com/iq7pkdiu/image/upload/v1787475435/left.jpg"
          >
            <source src="https://res.cloudinary.com/iq7pkdiu/video/upload/v1787474345/Hero-Edited-handbreak.mp4" type="video/mp4" />
          </video>
          <div className="video-shade" />
          <div className="scroll-prompt">
            <span>SCROLL</span>
            <div className="scroll-circle"><ArrowDown size={19} strokeWidth={1.4} /></div>
          </div>
        </aside>
      </section>

      <section className="about-section" id="giới-thiệu" aria-labelledby="about-heading">
        <div className="about-intro">
          <div>
            <p className="section-kicker">VỀ CHILL GYM</p>
            <h2 id="about-heading">TẬP HARD NHƯNG VẪN <em>"CHILL"</em></h2>
          </div>
          <p className="about-description">Gym chuyên nghiệp tại Thuận An, phù hợp cho cả nam và nữ.</p>
        </div>

        <div
          className="about-carousel"
          ref={carouselRef}
          onPointerDown={handleCarouselPointerDown}
          onPointerUp={handleCarouselPointerUp}
          onPointerCancel={() => setDragStart(null)}
          onPointerLeave={() => setDragStart(null)}
        >
          <div
            className="about-track"
            style={{ transform: `translateX(calc(-${aboutSlide} * ((100% + var(--about-gap)) / var(--about-slides))))` }}
          >
            {aboutImages.map((src, index) => (
              <figure className="about-image" key={src}>
                <img src={src} alt={`Không gian Chill Gym ${index + 1}`} loading={index < 3 ? 'eager' : 'lazy'} draggable="false" />
              </figure>
            ))}
          </div>
        </div>

        <div className="about-controls">
          <div className="about-arrows">
            <button type="button" onClick={goToPreviousAboutSlide} disabled={aboutSlide === 0} aria-label="Ảnh trước">
              <ArrowLeft size={19} strokeWidth={1.4} />
            </button>
            <button type="button" onClick={goToNextAboutSlide} disabled={aboutSlide === maxAboutSlide} aria-label="Ảnh tiếp theo">
              <ArrowRight size={19} strokeWidth={1.4} />
            </button>
            <span className="about-count">0{aboutSlide + 1} <i>/</i> 0{maxAboutSlide + 1}</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
