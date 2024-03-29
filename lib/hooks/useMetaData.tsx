import Head from "next/head";

export const useMetaData = (
  title: string,
  description: string,
  href: string
) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/assets/logo.svg" type="image/png" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={href} />
      <meta property="og:image" content="/assets/logo.svg" />
      <meta content="#407aed" data-react-helmet="true" name="theme-color" />
    </Head>
  );
};
