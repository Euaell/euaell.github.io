'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, User, Briefcase, Mail, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const navItems = [
	{ name: 'Home', href: '#home', icon: Home },
	{ name: 'About', href: '#about', icon: User },
	{ name: 'Work', href: '#work', icon: Briefcase },
	{ name: 'Contact', href: '#contact', icon: Mail },
]

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [activeSection, setActiveSection] = useState('home')
	const [scrolled, setScrolled] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
			
			// Update active section based on scroll position
			const sections = navItems.map(item => item.href.slice(1))
			const currentSection = sections.find(section => {
				const element = document.getElementById(section)
				if (element) {
					const rect = element.getBoundingClientRect()
					return rect.top <= 100 && rect.bottom >= 100
				}
				return false
			})
			
			if (currentSection) {
				setActiveSection(currentSection)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
		setIsOpen(false)
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<>
			{/* Desktop Navigation */}
			<motion.nav
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${
					scrolled ? 'glass-strong' : 'glass'
				} rounded-full px-6 py-3`}
			>
				<div className="flex items-center space-x-8">
					{navItems.map((item) => (
						<button
							key={item.name}
							onClick={() => scrollToSection(item.href)}
							className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
								activeSection === item.href.slice(1)
									? 'text-white bg-white/20'
									: 'text-white/70 hover:text-white hover:bg-white/10'
							}`}
						>
							{item.name}
							{activeSection === item.href.slice(1) && (
								<motion.div
									layoutId="activeSection"
									className="absolute inset-0 bg-white/20 rounded-full"
									transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
								/>
							)}
						</button>
					))}
					
					{/* Theme Toggle */}
					<button
						onClick={toggleTheme}
						className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
					>
						{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
					</button>
				</div>
			</motion.nav>

			{/* Mobile Navigation */}
			<div className="md:hidden">
				{/* Mobile Menu Button */}
				<motion.button
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2 }}
					onClick={() => setIsOpen(!isOpen)}
					className={`fixed top-4 right-4 z-50 p-3 glass-strong rounded-full transition-all duration-300 ${
						isOpen ? 'bg-white/20' : ''
					}`}
				>
					<AnimatePresence mode="wait">
						{isOpen ? (
							<motion.div
								key="close"
								initial={{ rotate: -90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: 90, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<X size={20} className="text-white" />
							</motion.div>
						) : (
							<motion.div
								key="menu"
								initial={{ rotate: 90, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								exit={{ rotate: -90, opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<Menu size={20} className="text-white" />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>

				{/* Mobile Menu Overlay */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
							onClick={() => setIsOpen(false)}
						/>
					)}
				</AnimatePresence>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
							className="fixed top-0 right-0 z-40 h-full w-80 glass-strong border-l border-white/10 p-6"
						>
							<div className="flex flex-col space-y-6 mt-16">
								{navItems.map((item, index) => (
									<motion.button
										key={item.name}
										initial={{ x: 50, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										transition={{ delay: index * 0.1 }}
										onClick={() => scrollToSection(item.href)}
										className={`flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-300 ${
											activeSection === item.href.slice(1)
												? 'text-white bg-white/20'
												: 'text-white/70 hover:text-white hover:bg-white/10'
										}`}
									>
										<item.icon size={20} />
										<span className="font-medium">{item.name}</span>
									</motion.button>
								))}
								
								{/* Theme Toggle */}
								<motion.button
									initial={{ x: 50, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: navItems.length * 0.1 }}
									onClick={toggleTheme}
									className="flex items-center space-x-3 px-4 py-3 text-left rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
								>
									{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
									<span className="font-medium">
										{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
									</span>
								</motion.button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}
