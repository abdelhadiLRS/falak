import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const query = {
    ...params,
    ...Object.fromEntries(searchParams.entries()),
  };

  const pathname = location.pathname;
  const asPath = location.pathname + location.search;

  return {
    pathname,
    asPath,
    query,
    locale: 'ar',
    basePath: '',
    events: {
      on: () => {},
      off: () => {},
    },
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, { replace: true }),
  };
}

export default useRouter;
