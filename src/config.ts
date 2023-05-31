import envSmart from 'env-smart';

export type Configuration = {
  githubPAT: string;
  port: number;
  routePrefix?: string;
  eventLimit?: number;
  secret?: string;
};

export const config = envSmart.config<Configuration>((env) => {
  return {
    githubPAT: env.GITHUB_TOKEN,
    port: !isNaN(parseInt(env.PORT)) ? parseInt(env.PORT) : 53123,
    routePrefix: env.ROUTE_PREFIX ? env.ROUTE_PREFIX : undefined,
    eventLimit: !isNaN(parseInt(env.EVENT_LIMIT))
      ? parseInt(env.EVENT_LIMIT)
      : 100,
    secret: env.SECRET ? env.SECRET : undefined,
  };
});
