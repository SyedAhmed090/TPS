import Breadcrumb from '../../components/Breadcrumb'
import useReveal from '../../hooks/useReveal'

const SECTIONS = [
  {
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us when you submit a quote request, place an order, or contact us. This includes your name, email address, phone number, company name, and the details of your custom patch order. We also automatically collect certain technical information when you visit our website, including your IP address, browser type, and pages visited.',
  },
  {
    title: 'How We Use Your Information',
    content: 'We use the information we collect to process your orders and quote requests, communicate with you about your orders, respond to your questions and requests, send you order updates and tracking information, improve our products and website, and comply with legal obligations. We do not sell, rent, or share your personal information with third parties for their marketing purposes.',
  },
  {
    title: 'Information Sharing',
    content: 'We may share your information with trusted service providers who help us operate our business, such as shipping carriers and payment processors. These service providers are contractually obligated to keep your information secure and use it only to provide services to us. We may also disclose your information if required by law or to protect our rights and the safety of our customers.',
  },
  {
    title: 'Data Security',
    content: 'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. Our website uses SSL encryption for data transmission. Payment processing is handled by PCI-compliant payment processors — we do not store your credit card information on our servers.',
  },
  {
    title: 'Cookies',
    content: 'Our website uses cookies and similar tracking technologies to enhance your experience, analyze site usage, and provide relevant content. You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of some parts of our website.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to access, correct, or delete your personal information that we hold. You may also opt out of receiving marketing communications at any time by contacting us or clicking "unsubscribe" in any marketing email. To exercise these rights, please contact us at info@thepatchsolutions.com.',
  },
  {
    title: 'Contact Us',
    content: 'If you have questions about this Privacy Policy or how we handle your personal information, please contact us at info@thepatchsolutions.com. This policy was last updated May 2025.',
  },
]

export default function PrivacyPolicy() {
  useReveal()
  return (
    <>
      <Breadcrumb items={[
        { href: '/', label: 'Home' },
        { label: 'Privacy Policy' },
      ]} />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1>Privacy Policy</h1>
          <p>Your privacy matters to us. This policy explains how we collect, use, and protect your information.</p>
        </div>
      </section>

      <section className="container">
        <div className="prose reveal">
          <p>Effective Date: January 1, 2025 | Last Updated: May 2025</p>
          <p>The Patch Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
