const heroImage = 'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486658/HLV_10.jpg';

const galleryImages = [
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486745/FACILITY_11.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486725/FACILITY_9.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486722/HLV_8.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486750/FACILITY_10.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486718/HLV_7.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486715/HLV_2.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486712/HLV_14.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486715/HLV_3.jpg',
  'https://res.cloudinary.com/iq7pkdiu/image/upload/v1787486712/HLV_16.jpg',
];

function TrainingEnvironment() {
  return (
    <section className="environment-section" id="môi-trường-tập-luyện" aria-labelledby="environment-heading">
      <div className="environment-hero">
        <img
          className="environment-hero-image"
          src={heroImage}
          alt="Huấn luyện viên đồng hành cùng hội viên tại Chill Gym"
          loading="eager"
          decoding="async"
        />
        <div className="environment-hero-shade" />
        <h2 id="environment-heading">MÔI TRƯỜNG TẬP LUYỆN RIÊNG TƯ VÀ LUÔN ĐƯỢC HỖ TRỢ</h2>
      </div>

      <div className="environment-gallery" aria-label="Không gian tập luyện và huấn luyện viên Chill Gym">
        {galleryImages.map((src, index) => (
          <figure className="environment-gallery-item" key={src}>
            <img
              src={src}
              alt={`Không gian tập luyện Chill Gym ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

export default TrainingEnvironment;
