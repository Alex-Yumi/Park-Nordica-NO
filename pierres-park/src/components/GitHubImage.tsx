'use client';

import Image, { ImageProps } from 'next/image';
import { githubImageLoader } from '@/utils/imageLoader';

type GitHubImageProps = Omit<ImageProps, 'loader'>;

/**
 * Eine Komponente, die Bilder von GitHub Raw lädt, 
 * um das Problem mit Git LFS bei Vercel zu umgehen.
 */
export default function GitHubImage(props: GitHubImageProps) {
  return <Image {...props} loader={githubImageLoader} />;
} 