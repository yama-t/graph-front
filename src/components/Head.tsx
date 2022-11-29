import React from "react";
import { Helmet } from "react-helmet-async";

interface OgContent {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  image?: string;
}

const defaultTitle = "ポートフォリオ";

export default function Head(props: OgContent) {
  const { title = defaultTitle, description, url, siteName, image } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <head prefix="og: http://ogp.me/ns#" />
      {description && <meta name="description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
