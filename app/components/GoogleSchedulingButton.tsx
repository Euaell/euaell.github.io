'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

declare global {
	interface Window {
		calendar?: {
			schedulingButton: {
				load: (config: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
			}
		}
	}
}

export default function SchedulingButton() {
	
	useEffect(() => {
		// Add the CSS
		const link = document.createElement('link');
		link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css';
		link.rel = 'stylesheet';
		document.head.appendChild(link);

		// Add the script
		const script = document.createElement('script');
		script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
		script.async = true;
		document.body.appendChild(script);

		script.onload = () => {
			if (window.calendar) {
				window.calendar.schedulingButton.load({
					url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ26L_QvdVzsVp92i63Zq_DQhfCxMjs6uisbqemA_l9-m204uQWgcsVASaSvJ37QhlLIFVH_pi7K?gv=true',
					color: '#6337ff',
					label: 'Book an appointment',
					target: document.getElementById('scheduling-button'),
				});
			}
		};

		return () => {
			if (document.head.contains(link)) {
				document.head.removeChild(link);
			}
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	}, []);

	return (
		<motion.div 
			id="scheduling-button" 
			className="mt-8 flex justify-center md:justify-start"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.3 }}
		/>
	);
}

