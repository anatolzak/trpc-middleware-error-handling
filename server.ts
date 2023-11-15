import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from '.';

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);
