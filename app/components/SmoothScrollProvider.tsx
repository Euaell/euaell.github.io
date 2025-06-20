'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// Enable smooth scrolling
		document.documentElement.style.scrollBehavior = 'smooth'
		
		// Optional: Add custom smooth scrolling for better control
		const handleSmoothScroll = (e: Event) => {
			const target = e.target as HTMLAnchorElement
			if (target.hash) {
				e.preventDefault()
				const element = document.querySelector(target.hash)
				if (element) {
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					})
				}
			}
		}

		// Add event listeners for anchor links
		const links = document.querySelectorAll('a[href^="#"]')
		links.forEach(link => {
			link.addEventListener('click', handleSmoothScroll)
		})

		return () => {
			links.forEach(link => {
				link.removeEventListener('click', handleSmoothScroll)
			})
		}
	}, [])

	return <>{children}</>
}
