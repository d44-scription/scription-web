export default function authenticationHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    // JWT format
    return { "Authorization": `Token ${user.token}` };
  } else {
    return {};
  }
}
