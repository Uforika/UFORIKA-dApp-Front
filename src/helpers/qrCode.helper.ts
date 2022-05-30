export const downloadQRCode = (elementId: string) => {
  const qrCodeURL = (document.getElementById(elementId) as HTMLCanvasElement).toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
  const aEl = document.createElement('a');
  aEl.href = qrCodeURL;
  aEl.download = 'QR_Code.png';
  document.body.appendChild(aEl);
  aEl.click();
  document.body.removeChild(aEl);
};
