import React from 'react';
import {
  Smartphone,
  Layout,
  Webhook,
  Palette,
  Laptop,
  Bot,
  BadgeDollarSign,
  TestTube2,
  Bug,
  Sparkles
} from 'lucide-react';

export const TechIcon = ({ name, className = "h-6 w-6" }) => {
  switch (name) {
    case 'Flutter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37z" fill="#42A5F5" />
          <path d="M14.314 0L8.158 6.156l3.697 3.696 7.829-7.829h-5.37z" fill="#0D47A1" />
          <path d="M11.996 14.308l3.7 3.702 3.696-3.702-3.696-3.696-3.7 3.696z" fill="#42A5F5" />
          <path d="M15.696 18.01l2.306 2.306 3.696-3.696-2.306-2.306-3.696 3.696z" fill="#0D47A1" />
          <path d="M18.002 20.316l3.696-3.696h-7.382l3.686 3.696z" fill="#01579B" />
        </svg>
      );

    case 'Dart':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4.1 3.5L3.5 4.1v15.8l.6.6h4.1l11.7-11.7.6-.6V4.1l-.6-.6H4.1z" fill="#00B4AB" />
          <path d="M19.9 8.2L8.2 19.9l3.5 3.5.6.6h7.6l.6-.6V11.7l-.6-.6-3.5-3.5z" fill="#0081C6" />
          <path d="M8.2 19.9l3.5 3.5.6.6h7.6l.6-.6v-7.6l-.6-.6-11.7 4.7z" fill="#005A9C" />
          <path d="M4.1 3.5h7.6l8.2 8.2v-3.5L14.1 2.4l-.6-.6H4.1z" fill="#0175C2" />
        </svg>
      );

    case 'Python':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M11.9 2c-3.1 0-5 .4-5 2.1v2.4h5.2v.7H4.5C2.5 7.2 2 8.7 2 11.8c0 3.2.7 4.7 2.8 4.7h1.6v-2.3c0-1.8 1.4-3.3 3.3-3.3h5.2c1.5 0 2.8-1.2 2.8-2.8V4.8C17.7 2.4 15.9 2 11.9 2zm-1.8 1.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#3776AB" />
          <path d="M12.1 22c3.1 0 5-.4 5-2.1v-2.4H11.9v-.7h7.6c2 0 2.5-1.5 2.5-4.6 0-3.2-.7-4.7-2.8-4.7h-1.6v2.3c0 1.8-1.4 3.3-3.3 3.3H9.1c-1.5 0-2.8 1.2-2.8 2.8v3.3c0 2.4 1.8 2.8 5.8 2.8zm1.8-1.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FFD43B" />
        </svg>
      );

    case 'FastAPI':
    case 'Python FastAPI':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <circle cx="12" cy="12" r="11" fill="#009688" />
          <path d="M12 4L6 14h5v6l6-10h-5V4z" fill="#FFFFFF" />
        </svg>
      );

    case 'Firebase':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M4.68 15.48L7.14 3.96a.78.78 0 011.47-.19l2.76 5.16-6.69 6.55z" fill="#FFA000" />
          <path d="M12.96 11.23l-1.59-3.04-6.69 7.29 10.97 6.16c.64.36 1.43-.09 1.45-.83l.11-2.07-4.25-7.51z" fill="#F57C00" />
          <path d="M12.96 11.23L15.3 6.94a.78.78 0 011.4.15l4.5 12.78-4.25-7.51-3.99-1.13z" fill="#FFCA28" />
          <path d="M4.68 15.48L12 19.6l3.99-1.13-11.31-2.99z" fill="#FFA000" opacity="0.8" />
        </svg>
      );

    case 'HTML':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3 2l1.6 18.2L12 22.4l7.4-2.2L21 2H3z" fill="#E44D26" />
          <path d="M12 3.7v16.9l5.8-1.7 1.3-15.2H12z" fill="#F16529" />
          <path d="M12 7.8H7.5l.3 3.3H12v-3.3zm0 6.6H9.7l-.2-2.3H7.2l.4 5 4.4 1.2V14.4zm0-6.6v3.3h4.2l-.3 3.3-3.9 1v3.3l6.5-1.8.8-9.1H12z" fill="#FFFFFF" />
        </svg>
      );

    case 'CSS':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3 2l1.6 18.2L12 22.4l7.4-2.2L21 2H3z" fill="#1572B6" />
          <path d="M12 3.7v16.9l5.8-1.7 1.3-15.2H12z" fill="#33A9DC" />
          <path d="M12 7.8H7.5l.3 3.3H12v-3.3zm0 6.6H9.7l-.2-2.3H7.2l.4 5 4.4 1.2V14.4zm0-6.6v3.3h4.2l-.3 3.3-3.9 1v3.3l6.5-1.8.8-9.1H12z" fill="#FFFFFF" />
        </svg>
      );

    case 'Mobile Dev':
      return <Smartphone className={`${className} text-[#38bdf8]`} />;

    case 'Frontend Dev':
      return <Layout className={`${className} text-[#a78bfa]`} />;

    case 'API Integration':
      return <Webhook className={`${className} text-[#34d399]`} />;

    case 'UI/UX Design':
      return <Palette className={`${className} text-[#f472b6]`} />;

    case 'Responsive UI':
      return <Laptop className={`${className} text-[#38bdf8]`} />;

    case 'Figma to Flutter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
          <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
          <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#F24E1E" />
          <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
          <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
        </svg>
      );

    case 'AI Dev Tools':
      return <Bot className={`${className} text-[#38bdf8]`} />;

    case 'Google AdMob':
      return <BadgeDollarSign className={`${className} text-[#facc15]`} />;

    case 'App Testing':
      return <TestTube2 className={`${className} text-[#4ade80]`} />;

    case 'Debugging':
      return <Bug className={`${className} text-[#f87171]`} />;

    case 'Play Store':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M3.6 1.4C3.2 1.8 3 2.4 3 3.2v17.6c0 .8.2 1.4.6 1.8l.1.1 9.9-9.9v-.2L3.7 1.3l-.1.1z" fill="#00D2FF" />
          <path d="M16.9 15.9l-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3l-3.9 2.2-.1-.1z" fill="#FFC800" />
          <path d="M13.6 12.5L3.6 22.5c.4.4 1 .4 1.7.1l11.7-6.6-3.4-3.5z" fill="#00F076" />
          <path d="M13.6 11.5l3.4-3.5L5.3 1.4c-.7-.4-1.3-.3-1.7.1l10 10z" fill="#FF3A44" />
        </svg>
      );

    default:
      return <Sparkles className={`${className} text-[#ffd60a]`} />;
  }
};
