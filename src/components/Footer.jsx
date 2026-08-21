import { Link } from 'react-router-dom';

const discoverLinks = [
  { path: '/', display: 'Home' },
  { path: '/tours', display: 'Tours' },
  
];

const quickLinks = [
  { path: '/login', display: 'Login' },
  { path: '/register', display: 'Register' },
];

const socialLinks = [
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.6 4.6 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 .1 3.2 4.6 4.6 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.3.4a4.6 4.6 0 0 1 1.7 1 4.6 4.6 0 0 1 1 1.7c.2.5.4 1.2.4 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.3a4.6 4.6 0 0 1-1 1.7 4.6 4.6 0 0 1-1.7 1c-.5.2-1.2.4-2.3.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.3-.4a4.6 4.6 0 0 1-1.7-1 4.6 4.6 0 0 1-1-1.7c-.2-.5-.4-1.2-.4-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.3a4.6 4.6 0 0 1 1-1.7 4.6 4.6 0 0 1 1.7-1c.5-.2 1.2-.4 2.3-.4C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3a2.8 2.8 0 0 0-1 .7 2.8 2.8 0 0 0-.7 1c-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7a2.8 2.8 0 0 0 .7 1 2.8 2.8 0 0 0 1 .7c.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3a2.8 2.8 0 0 0 1-.7 2.8 2.8 0 0 0 .7-1c.1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7a2.8 2.8 0 0 0-.7-1 2.8 2.8 0 0 0-1-.7c-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm5-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-columns">
        <div className="footer-col logo">
          <div className="brand" style={{ marginBottom: 10 }}>
            <span className="brand-mark" />
            Wayfarer
          </div>
          <p>Explore new places, create beautiful memories, and make every journey unforgettable. Your next adventure starts here! ✈️🌍
</p>
          <div className="social_links">
            {socialLinks.map((s) => (
              <span key={s.label}>
                <a href={s.href} aria-label={s.label}>{s.icon}</a>
              </span>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h5 className="footer_list-title">Discover</h5>
          <ul className="footer_quick-links">
            {discoverLinks.map((item) => (
              <li key={item.path} className="quicklinkbox">
                <Link to={item.path}>{item.display}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h5 className="footer_list-title">Quick Links</h5>
          <ul className="footer_quick-links">
            {quickLinks.map((item) => (
              <li key={item.path} className="quicklinkbox">
                <Link to={item.path}>{item.display}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h5 className="footer_list-title">Contact</h5>
          <ul className="footer_quick-links footer-contact">
            <li className="quicklinkbox">
              <h6>Address:</h6>
              <p>raja street</p>
            </li>
            <li className="quicklinkbox">
              <h6>Email:</h6>
              <p>tamilarasi3086@gmail.com</p>
            </li>
            <li className="quicklinkbox">
              <h6>Phone:</h6>
              <p>1234567890</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center cr-border">
        <p className="copyright">Copyright © {year} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;