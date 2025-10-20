export const option = {
    get: () => ({
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    post: (body) => ({
        method: "POST",
        headers: {
             "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }),
    put: (body) => ({
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }),
    delete: (body) => ({
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}