'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, AlertCircle } from 'lucide-react';
import { garageData } from '@/data/garageData';
import { soundEngine } from '@/utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService,
}: BookingModalProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Car Service',
    vehicleModel: '',
    preferredDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+ \-()]{7,20}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.vehicleModel.trim()) {
      errs.vehicleModel = 'Vehicle make, model, & year is required';
    }
    if (!formData.preferredDate) {
      errs.preferredDate = 'Preferred service date is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    if (validate()) {
      const generatedId = `NG-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingId(generatedId);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
          {/* Backdrop click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white border border-[#E5E5E5] p-6 md:p-10 shadow-2xl z-10 space-y-6 my-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <span className="w-2.5 h-5 bg-[#0066FF] -skew-x-12 inline-block" />
                  <span className="w-2.5 h-5 bg-[#0048C9] -skew-x-12 inline-block" />
                  <span className="w-2.5 h-5 bg-[#CC0000] -skew-x-12 inline-block" />
                </div>
                <div>
                  <span className="font-orbitron font-extrabold text-sm md:text-base tracking-wider text-[#111111] uppercase block">
                    NAVEEN GARAGE
                  </span>
                  <span className="font-orbitron text-[9px] text-[#666666] uppercase tracking-widest">
                    SERVICE APPOINTMENT DESK
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#666666] hover:text-[#111111] hover:bg-[#F5F5F5] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#0066FF] text-white flex items-center justify-center rounded-full shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-orbitron font-black text-2xl text-[#111111] uppercase">
                    SERVICE APPOINTMENT CONFIRMED
                  </h3>
                  <div className="inline-block px-3 py-1 bg-[#F5F5F5] border border-[#E5E5E5] font-orbitron text-xs font-bold text-[#0066FF]">
                    BOOKING REFERENCE: {bookingId}
                  </div>
                </div>

                <p className="font-rajdhani text-base text-[#666666] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your appointment for <strong>{formData.service}</strong> on <strong>{formData.preferredDate}</strong> has been logged. Our service advisor will call you at <strong>{formData.phone}</strong> for vehicle drop-off coordination.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <h3 className="font-orbitron font-black text-xl text-[#111111] uppercase">
                    BOOK SERVICE & ESTIMATE
                  </h3>
                  <p className="font-rajdhani text-xs text-[#666666] mt-0.5 font-medium">
                    Select your required service package and schedule your preferred garage bay inspection.
                  </p>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="e.g. Vikram Malhotra"
                      className={`w-full px-3 py-2 bg-[#F5F5F5] border ${
                        errors.name ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] focus:bg-white text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.name && <span className="text-[11px] text-[#CC0000] font-rajdhani">{errors.name}</span>}
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
                      className={`w-full px-3 py-2 bg-[#F5F5F5] border ${
                        errors.phone ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] focus:bg-white text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.phone && <span className="text-[11px] text-[#CC0000] font-rajdhani">{errors.phone}</span>}
                  </div>
                </div>

                {/* Email & Service */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="e.g. vikram@example.com"
                      className={`w-full px-3 py-2 bg-[#F5F5F5] border ${
                        errors.email ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] focus:bg-white text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.email && <span className="text-[11px] text-[#CC0000] font-rajdhani">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                      SERVICE REQUIRED *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F5F5F5] border border-[#E5E5E5] focus:border-[#0066FF] focus:bg-white text-xs font-rajdhani font-semibold outline-none transition-colors"
                    >
                      {garageData.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vehicle Make/Model & Preferred Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                      VEHICLE MAKE, MODEL & YEAR *
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleModel}
                      onChange={(e) => {
                        setFormData({ ...formData, vehicleModel: e.target.value });
                        if (errors.vehicleModel) setErrors({ ...errors, vehicleModel: '' });
                      }}
                      placeholder="e.g. BMW M4 Competition (2022)"
                      className={`w-full px-3 py-2 bg-[#F5F5F5] border ${
                        errors.vehicleModel ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] focus:bg-white text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.vehicleModel && (
                      <span className="text-[11px] text-[#CC0000] font-rajdhani">{errors.vehicleModel}</span>
                    )}
                  </div>

                  <div>
                    <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                      PREFERRED SERVICE DATE *
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredDate: e.target.value });
                        if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                      }}
                      className={`w-full px-3 py-2 bg-[#F5F5F5] border ${
                        errors.preferredDate ? 'border-[#CC0000]' : 'border-[#E5E5E5]'
                      } focus:border-[#0066FF] focus:bg-white text-xs font-rajdhani font-semibold outline-none transition-colors`}
                    />
                    {errors.preferredDate && (
                      <span className="text-[11px] text-[#CC0000] font-rajdhani">{errors.preferredDate}</span>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="font-orbitron text-[10px] font-bold text-[#666666] uppercase block mb-1">
                    SPECIAL SYMPTOMS / NOTES (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mention any vibrations, warning lights, brake noise, or specific requests..."
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-[#E5E5E5] focus:border-[#0066FF] focus:bg-white text-xs font-rajdhani font-medium outline-none transition-colors"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    onMouseEnter={() => soundEngine.playHover()}
                    className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-98 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>CONFIRM SERVICE APPOINTMENT</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
