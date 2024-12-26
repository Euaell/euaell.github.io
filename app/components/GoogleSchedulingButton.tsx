'use client';

import { useEffect } from 'react';

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
					color: '#039BE5',
					label: 'Book an appointment',
					target: document.getElementById('scheduling-button'),
				});
			}
		};

		return () => {
			document.head.removeChild(link);
			document.body.removeChild(script);
		};
	}, []);

	return <div id="scheduling-button" className="ml-4"></div>;
}

