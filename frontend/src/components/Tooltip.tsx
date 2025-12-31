import React from 'react';
import '../styles/Calendar.css';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, x, y, children }) => {
  if (!visible) return null;
  const style: React.CSSProperties = {
    position: 'fixed',
    left: x + 8,
    top: y + 8,
    zIndex: 1000,
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    padding: '8px 10px',
    borderRadius: 6,
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    maxWidth: 300,
    fontSize: 12,
  };
  return <div className="hc-tooltip" style={style}>{children}</div>;
};

export default Tooltip;
