export function boxShadow() {
  return {
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'
  }
}

type Side = 'left' | 'right' | 'top' | 'bottom' | 'all';

export function borderRadius(side: Side = 'left', value = 4) {
  let style = {};

  switch (side) {
    case 'left':
      style = { borderRadius: `0 ${value}px ${value}px 0` };
      break;
    case 'right':
      style = { borderRadius: `${value}px 0 0 ${value}px` };
      break;
    case 'top':
      style = { borderRadius: `${value}px ${value}px 0 0` };
      break;
    case 'bottom':
      style = { borderRadius: `0 0 ${value}px ${value}px` };
      break;
    default:
      style = { borderRadius: `${value}px` };
  }
  
  return style
}

function border(side: Side[], value: string, color: string) {
  let styles = {};

  if (side.includes('left')) {
    styles = { ...styles, borderLeft: `${value} solid ${color}` };
  }

  if (side.includes('right')) {
    styles = { ...styles, borderRight: `${value} solid ${color}` };
  }

  if (side.includes('top')) {
    styles = { ...styles, borderTop: `${value} solid ${color}` };
  }

  if (side.includes('bottom')) {
    styles = { ...styles, borderBottom: `${value} solid ${color}` };
  }

  return styles;
}

export function cssBuilder() {
  let styles = {};

  let useTheme = false;

  return {
    addBoxShadow() {
      styles = { ...styles, ...boxShadow() };
      return this;
    },
    addBorderRadius(side?: Side, value?: number) {
      styles = { ...styles, ...borderRadius(side, value) };
      return this;
    },
    addBorder(side: Side[], value: string, color: string) {
      styles = { ...styles, ...border(side, value, color) };
      return this;
    },
    extra(style: object) {
      styles = { ...styles, ...style };
      return this;
    },
    useTheme() {
      useTheme = true;
      return this;
    },
    setBgColor(color?: string) {
      styles = { ...styles, bgColor: useTheme ? 'background.default' : color };
      return this;
    },
    exitTheme() {
      useTheme = false;
      return this;
    },
    done() {
      return styles;
    }
  }
}