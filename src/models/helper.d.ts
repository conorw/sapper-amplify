declare function SapperPreload(
    this: {fetch: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>},
    page: {host: string, path: string, params: any, query: any},
    session: any,
): any;