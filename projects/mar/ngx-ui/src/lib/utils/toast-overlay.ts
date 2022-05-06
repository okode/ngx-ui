export const toastOverlay = {
  _id: 'toast-overlay',
  _messageClassName: 'toast-overlay-message',
  _position: 'bottom',
  _style: 'default',
  _timeout: null,
  present: (
    message?: string,
    duration = 3000,
    position: 'bottom' | 'top' = 'bottom',
    style: 'default' | 'success' | 'info' | 'error' = 'default'
  ) => {
    if (typeof document === 'undefined') { return; }
    toastOverlay._position = position;
    toastOverlay._style = style;
    toastOverlay._createOrReplace();
    toastOverlay._setMessage(message);
    toastOverlay._showAnimate();
    if (toastOverlay._timeout) { clearTimeout(toastOverlay._timeout); }
    toastOverlay._timeout = setTimeout(() => toastOverlay.dismiss(), duration) as any;
  },
  dismiss: () => {
    if (typeof document === 'undefined') { return; }
    toastOverlay._hideAnimate();
  },
  _createOrReplace: () => {
    const exists = document.getElementById(toastOverlay._id);
    if (exists) { exists?.parentNode?.removeChild(exists); }
    const div = document.createElement('div');
    div.id = toastOverlay._id;
    div.className = 'hidden ' + toastOverlay._position + ' ' + toastOverlay._style;
    div.innerHTML = `
      <style>
        #${toastOverlay._id} {
          z-index: 999999;
          position: fixed;
          width: calc(100vw - 48px);
          margin-left: 24px;
          margin-right: 24px;
          padding: 18px 20px;
          border-radius: 6px;
          opacity: 1;
          visibility: visible;
          text-align: center;
          transition: all 0.5s ease-in-out;
        }
        @media (min-width: 800px) {
          #${toastOverlay._id} {
            width: 800px;
            margin-left: calc(50% - 400px);
            margin-right: calc(50% - 400px);
          }
        }
        #${toastOverlay._id}.top {
          top: calc(60px + 20px + env(safe-area-inset-top, 0px));
        }
        #${toastOverlay._id}.bottom {
          bottom: calc(60px + 20px + 10px + env(safe-area-inset-bottom, 0px));
        }
        #${toastOverlay._id}.default, #${toastOverlay._id}.info, #${toastOverlay._id}.error {
          background: #2D373D;
        }
        #${toastOverlay._id}.success {
          background: #008C47;
        }
        #${toastOverlay._id}.hidden {
          opacity: 0;
          visibility: hidden;
        }
        #${toastOverlay._id}.hidden.top {
          top: -200px;
        }
        #${toastOverlay._id}.hidden.bottom {
          bottom: -200px;
        }
        #${toastOverlay._id} .container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: start;
          padding: 0;
        }
        #${toastOverlay._id} .container img {
          margin: -2px 8px 0 -4px;
          opacity: 0.5;
        }
        #${toastOverlay._id}.success .container {
          justify-content: space-between;
        }
        #${toastOverlay._id}.success .container img {
          margin: -2px -4px 0 8px;
          opacity: 1;
        }
        #${toastOverlay._id} .container .${toastOverlay._messageClassName} {
          color: #fff;
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
          text-align: left;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      </style>
      <div class="container">
        ${toastOverlay._style === 'info'
          ? '<img class="h-icon-color-white" src="/assets/icons/functional/info.svg">' : ''}
        ${toastOverlay._style === 'error'
          ? '<img class="h-icon-color-white" src="/assets/icons/functional/close-circle.svg">' : ''}
        <div class="${toastOverlay._messageClassName}"></div>
        ${toastOverlay._style === 'success'
          ? '<img class="h-icon-color-white" src="/assets/icons/functional/check.svg">' : ''}
      </div>
    `;
    document.body.appendChild(div);
  },
  _setMessage: (message?: string) => {
    const textDiv = document.getElementsByClassName(toastOverlay._messageClassName);
    if (textDiv) { textDiv[0].innerHTML = message || ''; }
  },
  _showAnimate: () => {
    setTimeout(() => {
      const elm = document.getElementById(toastOverlay._id);
      if (elm && elm.classList.contains('hidden')) { elm.classList.remove('hidden'); }
    }, 1);
  },
  _hideAnimate: () => {
    setTimeout(() => {
      const elm = document.getElementById(toastOverlay._id);
      if (elm && !elm.classList.contains('hidden')) { elm.classList.add('hidden'); }
    }, 1);
  }
};
