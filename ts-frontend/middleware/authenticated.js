export default function ({ redirect, app }) {
  const isLoggedIn = app.$cookies.get('sessionToken');

  if (!isLoggedIn) {
    return redirect('/login');
  }
}
