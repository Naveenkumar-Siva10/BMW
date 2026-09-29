# NAVEEN GARAGE // Precision Automotive Care & Performance

A commercial automotive web application built for **Naveen Garage**, featuring an Awwwards-style interactive scrollytelling experience, 192-frame HTML5 canvas animation, Web Audio API telemetry audio, and a full suite of automotive garage services.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@theme` tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Interactive Canvas**: HTML5 Canvas with devicePixelRatio scaling & 192 sequential frame preloading
- **Audio Synthesizer**: Web Audio API engine for real-time engine RPM audio, telemetry beeps, and hover effects
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚗 Website Sections & Features

1. **Interactive Preloader**: Pre-flight system check with simulated telemetry bus diagnostics and interactive launch trigger.
2. **Fixed Navigation & Telemetry Bar**: Glassmorphism header with active audio toggle, tuning drive mode switcher (`QUALIFYING`, `ENDURANCE`, `WET`), quick appointment CTA, and mobile drawer menu.
3. **600vh Master Scrollytelling Sequence**:
   - 360-degree interactive vehicle walkaround powered by 192 sequential frames.
   - Real-time scroll velocity speedometer (KM/H).
   - Dynamic telemetry hotspot targets on vehicle components with interactive data tooltips.
   - 4 synchronized engineering phases:
     - *01 / Heritage & Precision* (0–25%)
     - *02 / Aerodynamics & Bodywork* (25–50%)
     - *03 / Cockpit & Diagnostics* (50–75%)
     - *04 / Powertrain & Performance* (75–100%)
4. **About Naveen Garage**: Workshop story, precision values, and real vehicle asset integration.
5. **Commercial Garage Services**: 10 real service offerings with category filters, warranties, and direct booking actions:
   - General Car Service
   - Periodic Maintenance
   - AC Service & Climate Care
   - Engine Diagnostics & ECU Tuning
   - Performance Brake Service
   - Synthetic Oil & Filter Change
   - Battery & Electrical Systems
   - 3D Laser Wheel Alignment
   - Ceramic Detailing & Protection
   - Multi-Point Car Inspection
6. **Specs & Telemetry Benchmark**: 3-category technical specifications (Workshop Capacity, Performance & Telemetry, Chassis & Geometry).
7. **Capabilities & Engineering Pillars**: Laser chassis calibration, thermal diagnostics, CAN-bus scopes, and engine blueprinting.
8. **Why Choose Us**: 6 customer-facing pillars (certified service, transparent communication, OEM parts, modern tools, cleanliness, and convenience).
9. **Automotive Gallery Archive**: High-resolution exterior, engine bay, aero splitters, and cockpit shots with interactive lightbox modal.
10. **4K Cinematic Video Reel**: Responsive cinema player showcasing `bmw.mp4` with custom playback and volume controls.
11. **Conversion CTA Banner**: High-impact banner with direct Book, Call, and WhatsApp buttons.
12. **Contact & Booking Desk**: Validated service appointment forms, operating hours, direct phone, WhatsApp link, and Google Maps integration.
13. **Interactive Modals**:
    - Service appointment booking modal with form validation and unique booking ID generator.
    - Deep technical benchmark & homologation specifications modal.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 📄 License & Credits

© 2026 **Naveen Garage**. All rights reserved. Built with precision engineering.
