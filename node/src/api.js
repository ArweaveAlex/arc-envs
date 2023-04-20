export async function post(endpoint, body, config) {
    const headers = new Headers(config?.headers || {});
    if (!headers.get("content-type")?.includes("application/json")) {
        headers.append("content-type", "application/json");
    }
    headers.append("accept", "application/json, text/plain, */*");
    return await request(endpoint, config, {
        method: "POST",
        body: typeof body !== "string" ? JSON.stringify(body) : body,
        headers,
    });
}
export async function request(endpoint, config, init) {
    const headers = new Headers(init?.headers || {});
    const baseURL = `${config.protocol}://${config.host}:${config.port}`;
    if (endpoint.startsWith("/")) {
        endpoint = endpoint.slice(1);
    }
    const finalEndpoint = `${baseURL}/${endpoint}`;
    
    let res = await fetch(finalEndpoint, {
        ...(init || {}),
        headers,
    });
    
    const contentType = res.headers.get("content-type");
    const response = res;
    if (contentType?.startsWith("application/json")) {
        response.data = (await res.clone().json());
        console.log(response.data);
    }
    else {
        try {
            response.data = (await res.clone().text());
        }
        catch {
            response.data = (await res.clone().arrayBuffer());
        }
    }
    return response;
}