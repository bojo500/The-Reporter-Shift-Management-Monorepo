type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const defaultOptions: Required<ToastOptions> = {
  duration: 3000,
  position: 'top-right',
}

const createToast = (message: string, type: ToastType, options: ToastOptions = {}) => {
  const { duration, position } = { ...defaultOptions, ...options }

  const existingContainer = document.getElementById('toast-container')
  let container = existingContainer

  if (!container) {
    container = document.createElement('div')
    container.id = 'toast-container'
    container.style.position = 'fixed'
    container.style.zIndex = '9999'

    const positions = {
      'top-right': { top: '1rem', right: '1rem' },
      'top-left': { top: '1rem', left: '1rem' },
      'bottom-right': { bottom: '1rem', right: '1rem' },
      'bottom-left': { bottom: '1rem', left: '1rem' },
      'top-center': { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
    }

    Object.assign(container.style, positions[position])
    document.body.appendChild(container)
  }

  const toast = document.createElement('div')
  toast.style.cssText = `
    padding: 1rem 1.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 300px;
    max-width: 500px;
    animation: slideIn 0.3s ease-out;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
    line-height: 1.25rem;
  `

  const colors = {
    success: { bg: '#10b981', text: '#ffffff' },
    error: { bg: '#ef4444', text: '#ffffff' },
    warning: { bg: '#f59e0b', text: '#ffffff' },
    info: { bg: '#3b82f6', text: '#ffffff' },
  }

  toast.style.backgroundColor = colors[type].bg
  toast.style.color = colors[type].text

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  toast.innerHTML = `
    <span style="font-weight: bold; font-size: 1.25rem;">${icons[type]}</span>
    <span style="flex: 1;">${message}</span>
    <button style="background: transparent; border: none; color: inherit; cursor: pointer; padding: 0; font-size: 1.25rem; line-height: 1;">×</button>
  `

  const closeButton = toast.querySelector('button')
  const closeToast = () => {
    toast.style.animation = 'slideOut 0.3s ease-out'
    setTimeout(() => {
      toast.remove()
      if (container && container.children.length === 0) {
        container.remove()
      }
    }, 300)
  }

  closeButton?.addEventListener('click', closeToast)

  container.appendChild(toast)

  if (duration > 0) {
    setTimeout(closeToast, duration)
  }

  if (!document.querySelector('#toast-animations')) {
    const style = document.createElement('style')
    style.id = 'toast-animations'
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
}

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  createToast(message, 'success', options)
}

export const showErrorToast = (message: string, options?: ToastOptions) => {
  createToast(message, 'error', options)
}

export const showWarningToast = (message: string, options?: ToastOptions) => {
  createToast(message, 'warning', options)
}

export const showInfoToast = (message: string, options?: ToastOptions) => {
  createToast(message, 'info', options)
}
