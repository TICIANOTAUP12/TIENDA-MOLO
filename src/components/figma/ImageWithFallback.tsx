import { useState } from 'react';

type Props = Omit<React.ComponentProps<'img'>, 'onError'> & {
  fallbackSrc?: string;
};

export const ImageWithFallback = ({ src, fallbackSrc, ...rest }: Props) => {
  const [error, setError] = useState(false);
  const fallback =
    fallbackSrc ||
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEyNy45MSAxMDAgMTEwIDExNy45MSAxMTAgMTQwQzExMCAxNjIuMDkgMTI3LjkxIDE4MCAxNTAgMTgwQzE3Mi4wOSAxODAgMTkwIDE2Mi4wOSAxOTAgMTQwQzE5MCAxMTcuOTEgMTcyLjA5IDEwMCAxNTAgMTAwWk0xNTAgMTcwQzEzMy40MyAxNzAgMTIwIDE1Ni41NyAxMjAgMTQwQzEyMCAxMjMuNDMgMTMzLjQzIDExMCAxNTAgMTEwQzE2Ni41NyAxMTAgMTgwIDEyMy40MyAxODAgMTQwQzE4MCAxNTYuNTcgMTY2LjU3IDE3MCAxNTAgMTcwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';

  return (
    <img
      src={error ? fallback : src}
      onError={() => setError(true)}
      {...rest}
    />
  );
};
