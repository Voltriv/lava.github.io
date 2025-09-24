import * as React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Optional fallback image (used if src fails) */
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%239ca3af"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24">Image unavailable</text></svg>';

export function ImageWithFallback({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt = "",
  ...rest
}: Props) {
  const [imgSrc, setImgSrc] = React.useState(src as string);

  React.useEffect(() => {
    setImgSrc(src as string);
  }, [src]);

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      loading="lazy"
      decoding="async"
    />
  );
}