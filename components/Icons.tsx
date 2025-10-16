// Fix: Create Icons file and export all required icon components
import React from 'react';

type IconProps = {
  className?: string;
};

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const LightningBoltIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.38-.67.72-1.28.34-.6.72-1.29 1.1-1.9.43-.69.83-1.32 1.19-1.88.32-.48.6-.9.81-1.24.22-.36.4-.64.53-.85.13-.2.23-.34.28-.42.05-.08.07-.12.08-.14.03-.04.03-.04.03-.05h-1.4c-.42 0-.6-.33-.42-.66.19-.34.38-.67.72-1.28.34-.6.72-1.29 1.1-1.9.43-.69.83-1.32 1.19-1.88.32-.48.6-.9.81-1.24.22-.36.4-.64.53-.85.13-.2.23-.34.28-.42.05-.08.07-.12.08-.14.03-.04.03-.04.03-.05H13c.42 0 .6.33.42.66-.19.34-.38.67-.72 1.28-.34-.6-.72-1.29-1.1-1.9-.43-.69-.83-1.32-1.19-1.88-.32-.48-.6-.9-.81-1.24-.22-.36-.4-.64-.53-.85-.13-.2-.23-.34-.28-.42-.05-.08-.07-.12-.08-.14-.03-.04-.03-.04-.03-.05L12 3v7h3.5c.58 0 .57.32.38.66-.19.34-.38.67-.72 1.28-.34.6-.72 1.29-1.1 1.9-.43.69-.83 1.32-1.19 1.88-.32.48-.6.9-.81 1.24-.22.36-.4.64-.53.85-.13.2-.23.34-.28.42-.05.08-.07.12-.08.14-.03.04-.03.04-.03.05H13v7h-2z" />
  </svg>
);

export const WrenchIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.75 5.25l-2.472 2.472a3.375 3.375 0 004.773 4.773z" />
    </svg>
);

export const ScrewdriverIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877m0 0L11.42 15.17l-4.773-4.773a3.375 3.375 0 00-4.773 4.773l2.472 2.472" />
    </svg>
);

export const SafetyHelmetIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-3.75V17.25m-12 0V13.5m0-3V4.875c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125V10.5m0 3.75V10.5m-12 0h12" />
    </svg>
);

export const SpeakerOnIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.108 12 5v14c0 .892-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);

export const SpeakerOffIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.108 12 5v14c0 .892-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-4-4m0 4l4-4" />
  </svg>
);
