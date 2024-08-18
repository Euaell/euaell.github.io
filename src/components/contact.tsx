import React, { ChangeEvent, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact(): React.ReactNode {
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

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const public_id = import.meta.env.VITE_EMAILJS_USER_ID

    const form_data = {
      from_name: formData.firstName + " " + formData.lastName,
      message: formData.comment,
      from_email: formData.email
    }
    emailjs.send(service_id, template_id, form_data, {
      publicKey: public_id
    })
    .then((response) => {
      console.debug("SUCCESS!", response.text)
      setFormData({firstName: '', lastName: '', email: '', comment: ''})
    })
    .catch((error) => {
      console.error("Failed ...", error.text)
      alert('There was an error sending the email.')
    })
  }

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Leave a comment</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </section>
  );
}

export default Contact;
