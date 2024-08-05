// src/lib/toast.ts
import { toast } from '@zerodevx/svelte-toast';

type ToastMessage = string;

const baseTheme = {
  '--toastBorderRadius': '8px',
  '--toastBoxShadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
  '--toastPadding': '0.75rem 1rem',
  '--toastMargin': '0 0 0.5rem 0'
};

export const success = (message: ToastMessage) => toast.push(message, {
  theme: {
    ...baseTheme,
    '--toastBackground': 'green',
    '--toastColor': 'white',
    '--toastBarBackground': 'olive'
  }
});

export const warning = (message: ToastMessage) => toast.push(message, {
  theme: {
    ...baseTheme,
    '--toastBackground': 'orange',
    '--toastColor': 'black',
    '--toastBarBackground': 'darkorange'
  }
});

export const failure = (message: ToastMessage) => toast.push(message, {
  theme: {
    ...baseTheme,
    '--toastBackground': 'red',
    '--toastColor': 'white',
    '--toastBarBackground': 'darkred'
  }
});
