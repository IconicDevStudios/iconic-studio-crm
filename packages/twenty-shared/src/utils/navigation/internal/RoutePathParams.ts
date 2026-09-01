type RoutePathSegmentParams<Segment extends string> =
  Segment extends `:${infer ParamName}?`
    ? { [Key in ParamName]?: string | null | undefined }
    : Segment extends `:${infer ParamName}`
      ? { [Key in ParamName]: string }
      : Segment extends '*'
        ? { '*': string }
        : Record<never, never>;

export type RoutePathParams<Path extends string> =
  Path extends `${infer Segment}/${infer Rest}`
    ? RoutePathSegmentParams<Segment> & RoutePathParams<Rest>
    : RoutePathSegmentParams<Path>;
