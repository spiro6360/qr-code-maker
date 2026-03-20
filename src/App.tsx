import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, UploadCloud, Link as LinkIcon, Palette, Image as ImageIcon, Circle, Square } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<string>('https://antigravity.google/generator');
  const [fgColor, setFgColor] = useState<string>('#6366f1');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  
  const [dotType, setDotType] = useState<any>('rounded');
  const [cornerType, setCornerType] = useState<any>('extra-rounded');
  
  const [logo, setLogo] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeIns = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCodeIns.current = new QRCodeStyling({
      width: 320,
      height: 320,
      data: data || ' ',
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 10
      },
      dotsOptions: {
        color: fgColor,
        type: dotType
      },
      backgroundOptions: {
        color: bgColor,
      },
      cornersSquareOptions: {
        color: fgColor,
        type: cornerType
      },
      cornersDotOptions: {
        color: fgColor,
        type: 'dot'
      }
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCodeIns.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (!qrCodeIns.current) return;
    qrCodeIns.current.update({
      data: data || ' ',
      image: logo || undefined,
      dotsOptions: {
        color: fgColor,
        type: dotType
      },
      backgroundOptions: {
        color: bgColor
      },
      cornersSquareOptions: {
        color: fgColor,
        type: cornerType
      },
      cornersDotOptions: {
        color: fgColor,
        type: 'dot'
      }
    });
  }, [data, fgColor, bgColor, dotType, cornerType, logo]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogo(null);
  };

  const downloadQR = (extension: 'png' | 'svg') => {
    if (!qrCodeIns.current) return;
    qrCodeIns.current.download({
      name: 'vibrant_qr_code',
      extension
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Vibrant QR</h1>
        <p>Dynamic, premium QR Code Generator with endless designs.</p>
      </header>

      <div className="main-content">
        {/* Editor Panel */}
        <div className="glass-panel">
          <h2 className="panel-title">
            <Palette size={24} color="var(--accent-1)" />
            Configure Design
          </h2>

          <div className="form-group">
            <label className="form-label">URL or Text Data</label>
            <div style={{ position: 'relative' }}>
              <LinkIcon size={18} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: 14 }} />
              <input
                type="text"
                className="input-field"
                style={{ paddingLeft: 44 }}
                placeholder="Enter URL to generate QR..."
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Colors</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="color-picker-row">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Foreground</span>
                <input
                  type="color"
                  className="color-picker"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                />
              </div>
              <div className="color-picker-row">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Background</span>
                <input
                  type="color"
                  className="color-picker"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Dot Style</label>
            <div className="options-grid">
              <div className={`option-card ${dotType === 'square' ? 'active' : ''}`} onClick={() => setDotType('square')}>
                <Square size={20} />
                Square
              </div>
              <div className={`option-card ${dotType === 'dots' ? 'active' : ''}`} onClick={() => setDotType('dots')}>
                <Circle size={20} />
                Dots
              </div>
              <div className={`option-card ${dotType === 'rounded' ? 'active' : ''}`} onClick={() => setDotType('rounded')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="8"/></svg>
                Rounded
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Corner Shape</label>
            <div className="options-grid">
              <div className={`option-card ${cornerType === 'square' ? 'active' : ''}`} onClick={() => setCornerType('square')}>
                <Square size={20} />
                Square
              </div>
              <div className={`option-card ${cornerType === 'dot' ? 'active' : ''}`} onClick={() => setCornerType('dot')}>
                <Circle size={20} />
                Dot
              </div>
              <div className={`option-card ${cornerType === 'extra-rounded' ? 'active' : ''}`} onClick={() => setCornerType('extra-rounded')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="6"/></svg>
                Smooth
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Custom Logo (Center)</label>
            {!logo ? (
              <label className="logo-upload-btn">
                <UploadCloud size={32} color="var(--accent-2)" />
                <span style={{ fontSize: '0.9rem' }}>Click to upload logo image</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  style={{ display: 'none' }}
                  onChange={handleLogoUpload}
                />
              </label>
            ) : (
              <div className="logo-preview">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={logo} alt="Logo preview" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {logoFile?.name || 'Uploaded logo'}
                  </span>
                </div>
                <button className="remove-logo" onClick={removeLogo} title="Remove logo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div style={{ position: 'sticky', top: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="panel-title" style={{ width: '100%', marginBottom: 32 }}>
              <ImageIcon size={24} color="var(--accent-2)" />
              Live Preview
            </h2>
            
            <div className="qr-wrapper">
              <div ref={qrRef} />
            </div>

            <div className="download-actions">
              <button className="btn-secondary" onClick={() => downloadQR('svg')}>
                <Download size={18} />
                SVG
              </button>
              <button className="btn-primary" onClick={() => downloadQR('png')}>
                <Download size={18} />
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
