'use client';

import React, { useState } from 'react';
import { garageData } from '@/data/garageData';
import { Phone, Mail, MapPin, Clock, MessageSquare, Check, AlertCircle, Send, ExternalLink } from 'lucide-react';
import { soundEngine } from '@/utils/audio';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Car Service',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+ \-()]{7,20}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.service) errs.service = 'Please select a service';
    if (!formData.message.trim()) errs.message = 'Please provide details or vehicle model';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'General Car Service',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact-section" className="py-24 px-6 bg-white text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#0066FF]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                GET IN TOUCH
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              CONTACT NAVEEN GARAGE
            </h2>
          </div>
          <p className="font-rajdhani text-base md:text-lg text-[#666666] max-w-md font-medium leading-relaxed">
            Have questions about a service or need emergency diagnostic support? Reach our workshop team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Workshop Details & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-orbitron font-extrabold text-2xl text-[#111111] uppercase">
                WORKSHOP LOCATION & CONTACTS
              </h3>
              <p className="font-rajdhani text-base text-[#666666] leading-relaxed font-medium">
                Our workshop is fully equipped with dedicated service bays, laser geometry stations, and comfortable customer consultation lounges.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] flex items-start space-x-4">
                <div className="p-2.5 bg-[#0066FF] text-white shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-orbitron text-xs font-bold text-[#666666] uppercase">PHONE & WHATSAPP</div>
                  <a href={`tel:${garageData.phone}`} className="font-orbitron font-bold text-sm text-[#111111] hover:text-[#0066FF] transition-colors block">
                    {garageData.phone}
                  </a>
                  <a
                    href={`https://wa.me/${garageData.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-rajdhani text-[#0066FF] font-semibold hover:underline mt-0.5 inline-block"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] flex items-start space-x-4">
                <div className="p-2.5 bg-[#0048C9] text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-orbitron text-xs font-bold text-[#666666] uppercase">DIRECT EMAIL</div>
                  <a href={`mailto:${garageData.email}`} className="font-orbitron font-bold text-sm text-[#111111] hover:text-[#0066FF] transition-colors block">
                    {garageData.email}
                  </a>
                  <span className="text-xs font-rajdhani text-[#666666]">Typically replies within 2 business hours</span>
                </div>
              </div>

              <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] flex items-start space-x-4">
                <div className="p-2.5 bg-[#CC0000] text-white shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-orbitron text-xs font-bold text-[#666666] uppercase">WORKSHOP ADDRESS</div>
                  <p className="font-rajdhani text-sm text-[#111111] font-semibold leading-snug">
                    {garageData.address}
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-rajdhani text-[#0066FF] font-semibold hover:underline mt-1 inline-flex items-center space-x-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] flex items-start space-x-4">
                <div className="p-2.5 bg-[#111111] text-white shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1 w-full">
                  <div className="font-orbitron text-xs font-bold text-[#666666] uppercase">OPERATING HOURS</div>
                  <div className="flex justify-between text-xs font-rajdhani font-medium text-[#111111]">
                    <span>Monday – Friday:</span>
                    <strong className="font-orbitron">{garageData.businessHours.weekdays}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-rajdhani font-medium text-[#111111]">
                    <span>Saturday:</span>
                    <strong className="font-orbitron">{garageData.businessHours.saturday}</strong>
                  </div>
                  <div className="flex justify-between text-xs font-rajdhani font-medium text-[#666666]">
                    <span>Sunday:</span>
                    <span className="italic">{garageData.businessHours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact & Booking Form */}
          <div className="lg:col-span-7 bg-[#F5F5F5] border border-[#E5E5E5] p-6 md:p-10 shadow-sm relative">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 mx-auto bg-[#0066FF] text-white flex items-center justify-center rounded-full shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-orbitron font-extrabold text-2xl text-[#111111] uppercase">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="font-rajdhani text-base text-[#666666] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your service inquiry has been received by the Naveen Garage service desk. A service advisor will contact you at <strong>{formData.phone}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-orbitron font-extrabold text-xl text-[#111111] uppercase">
                    SERVICE CONSULTATION FORM
                  </h3>
                  <p className="font-rajdhani text-xs md:text-sm text-[#666666] mt-1 font-medium">
                    Submit your vehicle details and our engineers will confirm schedule availability and estimate.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.name ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.name && (
                      <div className="flex items-center space-x-1 text-[#CC0000] text-[11px] font-rajdhani mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.phone ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.phone && (
                      <div className="flex items-center space-x-1 text-[#CC0000] text-[11px] font-rajdhani mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.email ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.email && (
                      <div className="flex items-center space-x-1 text-[#CC0000] text-[11px] font-rajdhani mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                      SELECT SERVICE *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: '' });
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] focus:border-[#0066FF] text-xs font-rajdhani font-semibold outline-none transition-colors"
                    >
                      {garageData.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} ({s.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                    VEHICLE MODEL & DESCRIPTION *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Provide your vehicle make, model, year, and specific symptoms or requested work..."
                    className={`w-full px-3.5 py-2.5 bg-white border ${
                      errors.message ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                    } focus:border-[#0066FF] text-xs font-rajdhani font-semibold outline-none transition-colors`}
                  />
                  {errors.message && (
                    <div className="flex items-center space-x-1 text-[#CC0000] text-[11px] font-rajdhani mt-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2 active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT SERVICE INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
