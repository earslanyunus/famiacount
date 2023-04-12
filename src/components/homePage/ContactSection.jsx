import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <div className="container py-16">
        <p className="text-display-sm font-semibold text-gray-900 mb-4">Contact us</p>
        <p className="text-text-lg font-normal text-gray-600 mb-12">Feel free to ask any questions you have in mind. Our team is waiting for you :)</p>
        <ContactForm/>
    </div>
  )
}
