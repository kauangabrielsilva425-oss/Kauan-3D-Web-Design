import React, { useEffect, useMemo, useState } from 'react';
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from 'react-icon-cloud';

export interface IconCloudProps {
  iconSlugs?: string[];
  images?: string[];
}

export const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      minHeight: '380px',
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2.2,
    activeCursor: 'pointer',
    tooltip: 'native',
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.038,
    minSpeed: 0.018,
    dragControl: false,
    pinchZoom: false,
    freezeActive: false,
    shuffleTags: true,
    shape: 'sphere',
    noSelect: true,
  },
};

export const renderCustomIcon = (icon: SimpleIcon) => {
  return renderSimpleIcon({
    icon,
    bgHex: '#000000',
    fallbackHex: '#38BDF8',
    minContrastRatio: 1.2,
    size: 46,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
  });
};

export const IconCloud: React.FC<IconCloudProps> = ({ iconSlugs = [], images = [] }) => {
  const [data, setData] = useState<{ simpleIcons: Record<string, SimpleIcon> } | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (iconSlugs.length > 0) {
      fetchSimpleIcons({ slugs: iconSlugs })
        .then((res) => {
          if (isMounted) setData(res);
        })
        .catch((err) => {
          console.error('Failed to load icons for IconCloud:', err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return [];
    return Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon));
  }, [data]);

  const renderedCustomImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images.map((image, index) => (
      <a
        key={`custom-${index}`}
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{ cursor: 'pointer' }}
      >
        <img height="48" width="48" src={image} alt="platform logo" />
      </a>
    ));
  }, [images]);

  const combinedIcons = useMemo(() => {
    return [...renderedIcons, ...renderedCustomImages];
  }, [renderedIcons, renderedCustomImages]);

  const isStillLoading = iconSlugs.length > 0 && !data;

  if (isStillLoading || combinedIcons.length === 0) {
    return (
      <div className="w-full h-[380px] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#38BDF8]/20 border-t-[#38BDF8] animate-spin" />
      </div>
    );
  }

  return (
    // @ts-ignore
    <Cloud key={`cloud-${combinedIcons.length}`} {...cloudProps}>
      <>{combinedIcons}</>
    </Cloud>
  );
};

export default IconCloud;
