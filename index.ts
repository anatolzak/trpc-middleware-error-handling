import { publicProcedure, router } from './trpc';

const errorHandlingProcedure = publicProcedure.use(async ({ ctx, next }) => {
  try {
    return await next({ ctx });
  } catch (err) {
    console.log('caught error in middleware', err);
    throw err;
  }
});

export const appRouter = router({
  test: errorHandlingProcedure.query(async () => {
    throw new Error('Error from test procedure');
  }),
});

export type AppRouter = typeof appRouter;
