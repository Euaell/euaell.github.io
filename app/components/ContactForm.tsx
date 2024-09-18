'use client';

import emailjs from '@emailjs/browser';
import { ChangeEvent, useState } from 'react';

function ContactForm(): React.ReactElement {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comment: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const serviceID = 'service_pj3bisc';
    const templateID = 'template_pzqq2wx';
    const userID = 'T6gcZ8d7pzuDD5KId';

    const form_data = {
      from_name: formData.firstName + ' ' + formData.lastName,
      message: formData.comment,
      from_email: formData.email,
    };

    emailjs
      .send(serviceID, templateID, form_data, {
        publicKey: userID,
      })
      .then((response) => {
        console.debug('SUCCESS!', response.text);
        setFormData({ firstName: '', lastName: '', email: '', comment: '' });
        setSuccessMessage('Your message has been sent successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); // Hide message after 5 seconds
      })
      .catch((error) => {
        console.error('Failed ...', error.text);
        alert('There was an error sending the email.');
      });

    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="mb-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-full">
                <input
                  type="text"
                  id="first_name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="peer w-full px-0 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
                  placeholder="First Name"
                />
                <label
                  htmlFor="first_name"
                  className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                  peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  First Name
                </label>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="last_name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="peer w-full px-0 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
                  placeholder="Last Name"
                />
                <label
                  htmlFor="last_name"
                  className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                  peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Last Name
                </label>
              </div>
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer w-full px-0 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                className="peer w-full px-0 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent h-32 focus:outline-none focus:ring-0 focus:border-blue-500 resize-none"
                placeholder="Message"
              ></textarea>
              <label
                htmlFor="comment"
                className="absolute left-0 -top-5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Message
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Send Message
            <svg
              className="w-5 h-5 ml-2 animate-bounce"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
          {successMessage && (
            <div className="mt-6 flex items-center text-green-600 animate-fadeIn">
              {/* <CheckCircleIcon className="w-6 h-6 mr-2" /> */}
              <p>{successMessage}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
