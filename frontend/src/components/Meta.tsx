import Head from "next/head";

type Props = {
  title: string;
  description: string;
};

export const Meta: ({ title, description }: Props) => JSX.Element = ({
  title,
  description,
}: Props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="author" content="Tomoya Nishida" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};
