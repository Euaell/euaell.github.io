'use client';

import emailjs from '@emailjs/browser';
import { ChangeEvent, useState } from 'react';

import PaperPlaneIcon from '@/app/components/icons/PaperPlaneIcon';
import CheckCircleIcon from '@/app/components/icons/CheckCircleIcon';
import { motion } from 'framer-motion';
import BackgroundParticles from './BackgroundParticles';

import { FaLinkedin, FaGithub, FaEnvelope  } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaSquareUpwork } from 'react-icons/fa6';
import LoadingIcon from './icons/CircularLoadingIcon';
import { SiLinktree } from 'react-icons/si';
import Link from 'next/link';

const contactVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
	opacity: 1,
	scale: 1,
	transition: { duration: 0.6 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.6 } },
}

function ContactForm(): React.ReactElement {
  const [formLoading, setFormLoading] = useState(false);
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
	setFormLoading(true);
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
	  })
	  .finally(() => {
		setFormLoading(false);
	  });

	e.currentTarget.reset();
  }

  return (
	<motion.section
	  id="contact"
	  className="py-16 bg-transparent"
	  initial="hidden"
	  animate="visible"
	  exit="exit"
	  variants={contactVariants}
	>
	  <BackgroundParticles type="contact" />
	  <div className="container mx-auto px-6 lg:px-20 relative z-10">
		<h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
		  Get in Touch
		</h2>
		<div className="max-w-xl mx-auto bg-slate-100 p-8 rounded-lg shadow-lg">
		  <form onSubmit={handleSubmit}>
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
					className="peer rounded-md w-full shadow-sm px-1 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
					placeholder="First Name"
				  />
				  <label
					htmlFor="first_name"
					className="absolute left-0 px-1 -top-5 text-gray-700 text-sm transition-all peer-placeholder-shown:text-base
					peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
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
					className="peer rounded-md w-full shadow-sm px-1 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg"
					placeholder="Last Name"
				  />
				  <label
					htmlFor="last_name"
					className="absolute left-0 -top-5 px-1 text-gray-700 text-sm transition-all peer-placeholder-shown:text-base
					peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
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
				  className="peer rounded-md w-full px-1 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 focus:border-blue-500"
				  placeholder="Email"
				/>
				<label
				  htmlFor="email"
				  className="absolute left-0 px-1 shadow-sm focus:shadow-lg -top-5 text-gray-700 text-sm transition-all peer-placeholder-shown:text-base
				  peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
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
				  className="peer rounded-lg w-full px-1 py-2 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-transparent h-32 focus:outline-none focus:ring-0 focus:border-blue-500 resize-none"
				  placeholder="Message"
				></textarea>
				<label
				  htmlFor="comment"
				  className="absolute left-0 px-1 shadow-sm focus:shadow-lg -top-5 text-gray-700 text-sm transition-all peer-placeholder-shown:text-base
				  peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm"
				>
				  Message
				</label>
			  </div>
			</div>
			<div className='flex flex-row justify-between items-center'>
				<button
					type="submit"
					className={`flex items-center px-4 py-2 bg-sky-700 font-semibold text-lg
						text-white rounded-lg hover:bg-sky-800 hover:shadow-xl transition tracking-wide
						duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300`
						+ (formLoading ? " cursor-not-allowed bg-gray-500" : "")
					}
					disabled={formLoading}
				>
					Send Message
					{/* Paper Plane Icon */}
					{/* TODO: change it to a loading svg */}
					{formLoading ? <LoadingIcon className="w-6 h-6 ml-2 animate-spin" /> :
						<PaperPlaneIcon className={"w-6 h-6 ml-2 " + (successMessage ? "" : "animate-bounce")} />
					}
				</button>
				{/* Embed Here */}
			</div>
		  </form>
		  {/* Social Media Icons */}
		  <div className="mt-8">
			<div className="flex justify-center items-center">
			  <div className="flex flex-row justify-between w-4/5 md:w-1/2">
				<Link href="https://github.com/euaell" target="_blank" rel="noopener noreferrer" aria-label='GitHub'>
				  <FaGithub className="text-3xl text-gray-800 hover:text-blue-500 transition" />
				</Link>
				<Link href="https://linkedin.com/in/euael-eshete" target="_blank" rel="noopener noreferrer" aria-label='LinkedIn'>
				  <FaLinkedin className="text-3xl text-gray-800 hover:text-blue-500 transition" />
				</Link>
				<Link href="https://www.upwork.com/freelancers/euaell" target='_blank' rel="noopener noreferrer" aria-label='Upwork'>
				  <FaSquareUpwork className="text-3xl text-gray-800 hover:text-blue-500 transition"/>
				</Link>
				<Link href="https://twitter.com/euaelesh" target="_blank" rel="noopener noreferrer" aria-label='Twitter'>
				  <FaXTwitter className="text-3xl text-gray-800 hover:text-blue-500 transition" />
				</Link>
				<Link href="https://linktr.ee/euael" target="_blank" rel="noopener noreferrer" aria-label='Linktree'>
				  <SiLinktree className="text-3xl text-gray-800 hover:text-blue-500 transition" />
				</Link>
				<Link href="mailto:euaelmeko@gmail.com" target='_blank' rel="noopener noreferrer" aria-label='Email'>
				  <FaEnvelope className="text-3xl text-gray-800 hover:text-blue-500 transition" />
				</Link>
			  </div>
			</div>
		  </div>

		  {/* Success Message */}
		  {successMessage && (
			<div className="mt-6 flex items-center text-green-600 animate-fadeIn">
			  {/* Check Circle Icon */}
			  <CheckCircleIcon className="w-6 h-6 text-green-600" />
			  <p>{successMessage}</p>
			</div>
		  )}
		</div>
	  </div>
	</motion.section>
  )
}

export default ContactForm;
