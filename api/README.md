# API Boundary Migration

The `api/` directory contains standalone App Router-style handlers that were
imported before the repository had a single Next.js routing strategy. The
application currently uses the Pages Router under `src/pages`.

These handlers are intentionally excluded from the TypeScript project until
each endpoint is migrated to `src/pages/api` or the repository adopts the App
Router. This prevents unreachable and incomplete handlers from being treated
as production endpoints.

Migration requirements:

1. Choose one routing strategy for the endpoint.
2. Preserve request validation and explicit error status codes.
3. Add authentication and rate limiting where the endpoint is not public.
4. Add an integration test before enabling the endpoint.
5. Document data sources and licensing for content responses.
