import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

const VideoInfo = z.object({
  hlsSrc: z.string().optional(),
  src: z.string(),
  height: z.number(),
  width: z.number(),
  hasAudio: z.boolean().optional(),
  duration: z.number().optional(),
});

const ImageInfo = z.object({
  src: z.string(),
  height: z.number(),
  width: z.number(),
});

const GalleryInfo = z.object({
  media: z.array(VideoInfo.or(ImageInfo)),
  caption: z.string().optional(),
});

const MediaInfo = z.object({
  videoInfo: z.array(VideoInfo),
  imageInfo: z.array(ImageInfo),
  thumbnailInfo: ImageInfo,
  iFrameHTML: z.instanceof(Element),
  galleryInfo: z.array(GalleryInfo),

  isPortrait: z.boolean().optional(),
  isImage: z.boolean(),
  isVideo: z.boolean(),
  isLink: z.boolean(),
  isSelf: z.boolean(),
  isTweet: z.boolean(),
  isYTVid: z.boolean(),
  isIframe: z.boolean(),
  isDual: z.boolean(),
  hasMedia: z.boolean(),
  dimensions: z.tuple([z.number(), z.number()]),
});

export type VideoInfo = z.infer<typeof VideoInfo>;
export type ImageInfo = z.infer<typeof ImageInfo>;
export type GalleryInfo = z.infer<typeof GalleryInfo>;
export type MediaInfo = z.infer<typeof MediaInfo>;