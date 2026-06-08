import Image from "next/image";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ZoomableImage({ src, alt, width = 900, height = 400, className = "" }: ZoomableImageProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-150 shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        unoptimized
      />
    </div>
  );
}
