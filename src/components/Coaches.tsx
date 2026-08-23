import { useEffect, useRef, type ReactNode } from 'react';

type Coach = {
  name: string;
  role: string;
  image: string;
  alt: string;
};

const coaches: Coach[] = [
  {
    name: 'HOÀNG LONG',
    role: 'PERSONAL TRAINER',
    image: 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787489291/coach_3.jpg',
    alt: 'Hoàng Long – Personal Trainer at Chill Gym',
  },
  {
    name: 'MỸ LINH',
    role: 'PERSONAL TRAINER',
    image: 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787489339/coach_1.png',
    alt: 'Mỹ Linh – Personal Trainer at Chill Gym',
  },
  {
    name: 'TRỌNG PHÁT',
    role: 'PERSONAL TRAINER',
    image: 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787489413/coach_0.jpg',
    alt: 'Trọng Phát – Personal Trainer at Chill Gym',
  },
  {
    name: 'HUYỀN TRANG',
    role: 'PERSONAL TRAINER',
    image: 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787489333/coach_4.jpg',
    alt: 'Huyền Trang – Personal Trainer at Chill Gym',
  },
];

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Coaches() {
  const introRef = useReveal<HTMLDivElement>();

  return (
    <section className="coaches-section" id="dong-hanh-cung-ban" aria-labelledby="coaches-heading">
      <div className="coaches-intro reveal" ref={introRef}>
        <p className="section-kicker">ĐỘI NGŨ HUẤN LUYỆN VIÊN</p>
        <h2 id="coaches-heading">ĐỒNG HÀNH CÙNG BẠN</h2>
        <p className="coaches-tagline">Mỗi hành trình đều cần một người đồng hành đúng.</p>
      </div>

      <div className="coaches-grid">
        {coaches.map((coach, index) => (
          <Reveal key={coach.name} delay={index * 70}>
            <figure className="coach-card">
              <img
                src={coach.image}
                alt={coach.alt}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              <div className="coach-shade" />
              <figcaption className="coach-info">
                <span className="coach-name">{coach.name}</span>
                <span className="coach-role">{coach.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Coaches;
