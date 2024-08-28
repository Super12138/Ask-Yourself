export function getFile(url: string): Promise<string> {
    return fetch(url)
        .then(response => response.text())
        .catch(error => Promise.reject(error));
}