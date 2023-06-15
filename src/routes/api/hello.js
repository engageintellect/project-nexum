export async function get() {
  const data = { message: 'Hello, API!' };
  return {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
}
