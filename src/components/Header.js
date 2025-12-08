"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Placement & Outcomes", href: "/placement-outcomes" },
    { name: "About Us", href: "/about" },
    { name: "Resources", href: "/resources" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Contact Bar - Sticky, Hidden on mobile, visible on md+ */}
      <div className="hidden md:block sticky top-0 z-50 bg-[#E9EDE5] border-b border-gray-200">
        <div className="max pad">
          <div className="flex items-center justify-between py-2">
            {/* Left: Contact Info */}
            <div className="flex font-medium items-center gap-6">
              <div className="flex items-center gap-2 text-[16px] text-gray-700">
                <Phone className="w-4 h-4" />
                <span>Call us at </span>
                <Link
                  href="tel:+919876543210"
                  className="text-[#112711] hover:underline transition-colors font-medium"
                >
                  +91 98765 43210
                </Link>
                <span> | </span>
                <Link
                  href="tel:+919876543210"
                  className="text-[#112711] hover:underline transition-colors font-medium"
                >
                  +91 98765 43210
                </Link>
              </div>
              <div className="flex items-center gap-2 text-[16px] text-gray-700">
                <Mail className="w-4 h-4" />
                <span>Email us at </span>
                <Link
                  href="mailto:info@itppune"
                  className="text-[#112711] hover:underline transition-colors font-medium"
                >
                  info@itppune
                </Link>
              </div>
            </div>

            {/* Right: Quick Links */}
            <div className="flex font-medium items-center gap-6">
              <Link
                href="/contact"
                className="text-[16px] text-gray-700 hover:text-[#017D3E] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/language"
                className="text-[16px] text-gray-700 hover:text-[#017D3E] transition-colors"
              >
                Language
              </Link>
              <Link
                href="/address"
                className="text-[16px] text-gray-700 hover:text-[#017D3E] transition-colors"
              >
                Address
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Sticky below contact bar */}
      <header
        className={`sticky top-0 md:top-10  left-0 right-0 z-40 bg-[#FFFFFF] transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        <div className="max pad">
          <div className="flex items-center justify-between h-17 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo/main-logo.png"
                alt="iTprencur Logo"
                width={500}
                height={500}
                priority
                className=" h-10 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-normal links dm hover:opacity-80 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button & Hamburger */}
            <div className="flex items-center gap-4">
              <Link href="/demo" className="hidden btn dm sm:block text-white">
                Book a Free Demo
              </Link>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                  <span
                    className={`block w-full h-0.5 transition-transform duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                    style={{ backgroundColor: "var(--brand-dark)" }}
                  />
                  <span
                    className={`block w-full h-0.5 transition-opacity duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                    style={{ backgroundColor: "var(--brand-dark)" }}
                  />
                  <span
                    className={`block w-full h-0.5 transition-transform duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                    style={{ backgroundColor: "var(--brand-dark)" }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div
              className="flex items-center justify-between p-3"
              style={{ borderBottom: "1px solid var(--border-light)" }}
            >
              <Image
                src="/logo/main-logo.png"
                alt="iTprencur Logo"
                width={100}
                height={27}
                className="h-7 w-auto"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--brand-dark)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 px-6 py-8">
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block font-medium text-lg hover:opacity-80 transition-opacity"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Footer CTA */}
            <div
              className="p-6"
              style={{ borderTop: "1px solid var(--border-light)" }}
            >
              <Link
                href="/demo"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center block px-6 py-2.5 rounded-lg font-medium text-white hover:opacity-90 transition-all"
                style={{ backgroundColor: "var(--brand-green)" }}
              >
                Book a Free Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
