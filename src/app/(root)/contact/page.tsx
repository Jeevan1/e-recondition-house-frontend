import ContactForm from '@/components/Form/ContactForm';
import SectionHeading from '@/components/SectionHeading';
import data from '@/data.json';
import React from 'react';
import { FaPhone } from 'react-icons/fa6';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { ImLocation } from 'react-icons/im';

type Props = {};

export const metadata = {
  title: 'Contact Us | Recondition Hub',
  description:
    'Get in touch with Recondition Hub for inquiries about our reconditioned vehicles, services, or any other questions you may have. Our team is here to assist you.',
  openGraph: {
    title: 'Contact Us | Recondition Hub',
    description:
      'Reach out to Recondition Hub for all inquiries regarding our vehicles, services, or any questions. Our team is ready to assist you with all your needs.',
    locale: 'en_US',
    type: 'website',
  },
};

const ContactPage = (props: Props) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <div>
      <div className="pt-10">
        <div className="container">
          <SectionHeading title="Get In Touch" type="contact" />
        </div>
        <div className="bg-gray-100 py-7">
          <div className="container">
            <div className="block gap-7 md:grid-cols-5 lg:grid">
              <div className="mb-10 overflow-hidden rounded-md bg-white shadow-lg md:col-span-3 lg:mb-0">
                <ContactForm />
              </div>
              <div className="rounded-md bg-white p-3 shadow-lg sm:p-5 md:col-span-2">
                <h1 className="text-lg font-bold text-primary md:text-xl">
                  Our Contact Info
                </h1>
                <p className="text-dark mt-2 text-sm font-semibold md:text-sm">
                Have questions or need assistance? Feel free to contact us! 
                Our team is here to help with any inquiries about our platform, listings, or services.
                </p>
                <div>
                  {data.contact?.map((item, i) => (
                    <div
                      key={i}
                      className="mt-2 flex items-start gap-5 border-b py-2 last:border-none"
                    >
                      {item.title.toLocaleLowerCase().includes('phone') && (
                        <FaPhone className="text-[20px] text-primary md:text-[25px]" />
                      )}
                      {item.title.toLocaleLowerCase().includes('email') && (
                        <HiOutlineMailOpen className="text-[20px] text-primary md:text-[25px]" />
                      )}
                      {item.title.toLocaleLowerCase().includes('location') && (
                        <ImLocation className="text-[20px] text-primary md:text-[25px]" />
                      )}
                      <div>
                        <p className="text-xs font-bold md:text-sm">
                          {item.title}
                        </p>
                        {item.desc?.map((item, i) => (
                          <p
                            key={i}
                            className="text-dark pt-2 text-xs font-semibold md:text-sm"
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-gray-100 pt-10">
          <iframe
            name="google_map"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
            // width="600"
            height="450"
            style={{ width: '100%', height: '450px' }}
            aria-hidden="false"
          ></iframe>
        </div> */}
      </div>
    </div>
  );
};

export default ContactPage;
