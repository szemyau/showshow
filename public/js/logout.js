async function logout() {
  console.log("attempt to logout");
  let res = await fetch("/logout");
  let result = await res.json();
  location.reload();
}
