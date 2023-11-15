import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from './trpc';

const errorHandlingProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const resp = await next({ ctx });

  if (!resp.ok) {
    console.log('middleware intercepted error');
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return resp;
});

export const appRouter = router({
  test: errorHandlingProcedure.query(async () => {
    throw new Error('Error from test procedure');
  }),
});

export type AppRouter = typeof appRouter;
