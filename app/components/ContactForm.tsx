'use client';

import emailjs from '@emailjs/browser';
import { ChangeEvent, useState } from 'react';

function ContactForm(): React.ReactElement {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comment: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const serviceID = 'service_pj3bisc';
    const templateID = 'template_pzqq2wx';
    const userID = 'T6gcZ8d7pzuDD5KId';

    
    const form_data = {
      from_name: formData.firstName + " " + formData.lastName,
      message: formData.comment,
      from_email: formData.email
    }
    emailjs.send(serviceID, templateID, form_data, {
      publicKey: userID
    })
    .then((response) => {
      console.debug("SUCCESS!", response.text)
      setFormData({firstName: '', lastName: '', email: '', comment: ''})
    })
    .catch((error) => {
      console.error("Failed ...", error.text)
      alert('There was an error sending the email.')
    })

    e.currentTarget.reset();
  }

  return (
    <section id="contact"className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="mb-4 w-full gap-4 justify-between flex flex-col sm:flex-row">
            <div className="w-full">
              <label htmlFor="first_name" className="block text-lg font-medium mb-2">
                Frist Name
              </label>
              <input
                type="text"
                id="first_name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className='w-full'>
              <label htmlFor="last_name" className="block text-lg font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
