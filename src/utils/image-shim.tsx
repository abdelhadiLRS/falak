import React from 'react';

export const Image: React.FC<any> = ({ src, alt, width, height, className, ...props }) => {
  // Map standard next/image props to plain img element
  return <img src={src} alt={alt} width={width} height={height} className={className} {...props} />;
};

export default Image;
