import AppLayout from "../components/AppLayout";
import "../styles/globals.css";
import { AuthProvider } from "../context/useUser";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AuthProvider>
  );
}

export default MyApp;
