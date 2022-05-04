import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="px-4 py-5 my-5 text-center">
        <img
          alt="company logo"
          className="d-block mx-auto mb-4"
          src="https://res.cloudinary.com/elite-web-services/image/upload/v1651153876/Untitled_Artwork_1_qa34ja.png"
          width="150"
        />
        <h1 className="display-5 fw-bold text-center">Elite Web Services</h1>

        <div className="carousel-indicators"></div>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 text-center">
            In the modern age, no business survives without modern solutions.
            While your revenue may depend on your customers, with the right web
            solutions you can direct those customers to the choices that mean
            the difference for your business. It all starts with a modern
            website, but it doesn't end there. See all products.
          </p>
          <div className="text-center">
            <button
              onClick={() => navigate('/products')}
              className="btn btn-success btn-lg px-4 gap-3"
            >
              View Offerings
            </button>
          </div>
        </div>
      </div>
      <hr className="featurette-divider" />
      <div className="container marketing">
        <div className="row featurette">
          <div className="col-md-7 ">
            <h2 className="featurette-heading">Website design</h2>
            <p className="lead">
              Beatuiful designs that make your business stand out.{' '}
              <a className="productLink" href={`/products?q=&type=Website`}>
                Browse websites.
              </a>
            </p>
          </div>
          <div className="col-md-5">
            <img
              alt="product category"
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src="https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_tuq40k.png"
              width="500"
              height="500"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7 order-md-2 ">
            <h2 className="featurette-heading">Consultations</h2>
            <p className="lead">
              We know data. You have it. Let's get together and analyze it.{' '}
              <a
                className="productLink"
                href={`/products?q=&type=Consultation`}
              >
                See how we can help.
              </a>
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              alt="product category"
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src="https://res.cloudinary.com/elite-web-services/image/upload/v1650999415/service_po98bn.jpg"
              width="500"
              height="500"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7 ">
            <h2 className="featurette-heading">Services</h2>
            <p className="lead">
              When your businesss needs require ongoing support, we've got you
              covered.{' '}
              <a className="productLink" href={`/products?q=&type=Services`}>
                Get started on a new service.
              </a>
            </p>
          </div>
          <div className="col-md-5">
            <img
              alt="product category"
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src="https://res.cloudinary.com/elite-web-services/image/upload/v1650999341/consulting2_tyaxed.jpg"
              width="500"
              height="500"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <hr className="featurette-divider" />
        <h1 className="text-center">Meet the Team</h1>
        <div className="row">
          <div className="col-lg-4 text-center">
            <a
              href="https://github.com/hays-b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="team headshot"
                className="rounded-circle"
                src="https://res.cloudinary.com/elite-web-services/image/upload/v1651156205/IMG_8371_tznlbe.jpg"
                width="140"
                height="140"
                style={{ objectFit: 'cover' }}
              />
            </a>
            <h2>Hays</h2>
            <p>
              Hays can whip a website in to shape faster than you can run home
              to mama's apple pie
            </p>
          </div>
          <div className="col-lg-4 text-center">
            <a
              href="https://github.com/k-hongkham"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="team headshot"
                className="rounded-circle"
                src="https://res.cloudinary.com/elite-web-services/image/upload/v1651157072/20220428_101857_nbnpv8.jpg"
                width="140"
                height="140"
                style={{ objectFit: 'cover' }}
              />
            </a>
            <h2>Kevin</h2>
            <p>
              With a baby in one hand, and a keyboard in the other, he will
              bring your company's vision to fruition.
            </p>
          </div>
          <div className="col-lg-4 text-center">
            <a
              href="https://github.com/danielforkner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="team headshot"
                className="rounded-circle"
                src="https://res.cloudinary.com/elite-web-services/image/upload/v1651157944/Photo_Jul_04_17_19_24_mdj6wb.jpg"
                width="140"
                height="140"
                style={{ objectFit: 'cover' }}
              />
            </a>
            <h2>Daniel</h2>
            <p>
              His love for websites started with geocities and the rest is
              history.
            </p>
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="container">
          <div className="d-flex justify-content-center">
            <iframe
              width="100%"
              height="720"
              src="https://www.youtube.com/embed/hnYvfiz2YpM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <hr className="featurette-divider" />
      </div>
    </Fragment>
  );
};

export default Home;
