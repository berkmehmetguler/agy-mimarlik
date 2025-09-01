"use client";

import { useEffect, useState } from 'react';
import { IoCheckmarkCircleSharp, IoCloseCircleSharp, IoInformationCircleSharp, IoWarningSharp, IoClose } from 'react-icons/io5';
import { RiStarFill } from 'react-icons/ri';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface PremiumAlertProps {
  isOpen: boolean;
  onClose: () => void;
  type: AlertType;
  title: string;
  message?: string;
  autoClose?: number;
  showIcon?: boolean;
}

export const PremiumAlert: React.FC<PremiumAlertProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  autoClose,
  showIcon = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (autoClose) {
        const timer = setTimeout(() => handleClose(), autoClose);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgGradient: 'from-emerald-50 to-green-50',
          borderColor: 'border-emerald-200',
          iconColor: 'text-emerald-600',
          titleColor: 'text-emerald-800',
          messageColor: 'text-emerald-700',
          icon: IoCheckmarkCircleSharp,
          glowColor: 'shadow-emerald-200/50',
          accentGradient: 'from-emerald-400 to-green-500',
          statusBg: 'bg-emerald-500',
          statusColor: 'text-white'
        };
      case 'error':
        return {
          bgGradient: 'from-red-50 to-rose-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          messageColor: 'text-red-700',
          icon: IoCloseCircleSharp,
          glowColor: 'shadow-red-200/50',
          accentGradient: 'from-red-400 to-rose-500',
          statusBg: 'bg-red-500',
          statusColor: 'text-white'
        };
      case 'warning':
        return {
          bgGradient: 'from-amber-50 to-yellow-50',
          borderColor: 'border-amber-200',
          iconColor: 'text-amber-600',
          titleColor: 'text-amber-800',
          messageColor: 'text-amber-700',
          icon: IoWarningSharp,
          glowColor: 'shadow-amber-200/50',
          accentGradient: 'from-amber-400 to-yellow-500',
          statusBg: 'bg-amber-500',
          statusColor: 'text-white'
        };
      case 'info':
        return {
          bgGradient: 'from-blue-50 to-indigo-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-800',
          messageColor: 'text-blue-700',
          icon: IoInformationCircleSharp,
          glowColor: 'shadow-blue-200/50',
          accentGradient: 'from-blue-400 to-indigo-500',
          statusBg: 'bg-blue-500',
          statusColor: 'text-white'
        };
      default:
        return {
          bgGradient: 'from-gray-50 to-slate-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-800',
          messageColor: 'text-gray-700',
          icon: IoInformationCircleSharp,
          glowColor: 'shadow-gray-200/50',
          accentGradient: 'from-gray-400 to-slate-500',
          statusBg: 'bg-gray-500',
          statusColor: 'text-white'
        };
    }
  };

  if (!isOpen) return null;

  const styles = getAlertStyles();
  const IconComponent = styles.icon;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className={`absolute inset-0 bg-black/30 sm:bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      
      <div className={`relative bg-white/98 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-full mx-3 sm:mx-4 md:mx-6 transition-all duration-500 transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} shadow-2xl ${styles.glowColor} border ${styles.borderColor} min-h-fit`}>
        
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#C0A062]/5 to-[#D4B876]/5 blur-lg sm:blur-xl" />
        
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-2 sm:p-2.5 md:p-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-100 hover:to-red-200 transition-all duration-300 group shadow-xl border-2 border-white/80 hover:border-red-300/50 z-50 active:scale-95"
        >
          <IoClose className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-red-600 transition-colors duration-300" />
        </button>

        <div className="relative z-10 text-center pt-1 sm:pt-2">
          <div className="relative inline-flex items-center gap-2 sm:gap-3 md:gap-4 bg-gradient-to-r from-[#C0A062] to-[#D4B876] text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full mb-6 sm:mb-8 md:mb-10 shadow-lg">
            <RiStarFill size={16} className="flex-shrink-0" />
            <span className="font-semibold text-xs sm:text-sm md:text-base tracking-wide uppercase whitespace-nowrap">AGY Mimarlık</span>
            {showIcon && (
              <div className="absolute -top-2 -right-2 sm:-top-2.5 sm:-right-2.5 md:-top-3 md:-right-3">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full ${styles.statusBg} border-2 border-white shadow-xl flex items-center justify-center animate-pulse`}>
                  <IconComponent className={`w-4 h-4 sm:w-5 sm:h-6 md:w-6 md:h-6 ${styles.statusColor} drop-shadow-sm`} />
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${styles.bgGradient} border-2 ${styles.borderColor} shadow-2xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50 animate-pulse"></div>
              {showIcon && <IconComponent className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${styles.iconColor} relative z-10 drop-shadow-lg`} />}
              <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-white/20"></div>
            </div>
          </div>

          <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold ${styles.titleColor} mb-2 sm:mb-3 md:mb-4 leading-tight px-1 sm:px-2`}>
            {title}
          </h3>

          {message && (
            <p className={`text-sm sm:text-base md:text-lg ${styles.messageColor} leading-relaxed mb-4 sm:mb-6 md:mb-8 px-1 sm:px-2 max-w-prose mx-auto`}>
              {message}
            </p>
          )}

          <div className="flex justify-center items-center space-x-1.5 sm:space-x-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${styles.statusBg} animate-pulse`} />
            <div className={`w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 md:h-2 bg-gradient-to-r ${styles.accentGradient} rounded-full shadow-lg`} />
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${styles.statusBg} animate-pulse`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook for easier usage
export const usePremiumAlert = () => {
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    type: AlertType;
    title: string;
    message?: string;
    autoClose?: number;
  }>({ isOpen: false, type: 'info', title: '' });

  const showAlert = (type: AlertType, title: string, message?: string, autoClose?: number) => {
    setAlert({ isOpen: true, type, title, message, autoClose });
  };

  const hideAlert = () => setAlert(prev => ({ ...prev, isOpen: false }));

  const success = (title: string, message?: string, autoClose: number = 2000) => showAlert('success', title, message, autoClose);
  const error = (title: string, message?: string, autoClose?: number) => showAlert('error', title, message, autoClose);
  const warning = (title: string, message?: string, autoClose?: number) => showAlert('warning', title, message, autoClose);
  const info = (title: string, message?: string, autoClose?: number) => showAlert('info', title, message, autoClose);

  return {
    alert,
    showAlert,
    hideAlert,
    success,
    error,
    warning,
    info,
    AlertComponent: () => (
      <PremiumAlert
        isOpen={alert.isOpen}
        onClose={hideAlert}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        autoClose={alert.autoClose}
      />
    )
  };
};
