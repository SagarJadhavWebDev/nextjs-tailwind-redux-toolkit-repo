import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import useFetch, { CachePolicies, Provider as HTTPProvider } from "use-http";
import store from "redux/store";
import _getCookies from "@/utils/utils";

interface UseFetchWrapperProps {
  children: any;
  token: string;
}
export default function App({ Component, pageProps }: AppProps) {
  //disabled all console log
  if (process.env.NODE_ENV === "production") {
    if (typeof window !== "undefined") {
      ["log", "debug", "warn", "info"].forEach((method) => {
        console[method] = function () {};
      });
    }
  }
  const UseFetchWrapper: React.FC<UseFetchWrapperProps> = ({
    children,
    token,
  }) => {
    return (
      <HTTPProvider
        url={process.env.NEXT_PUBLIC_API_URL}
        options={{
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          interceptors: {
            async response({ response }) {
              if (
                response.status !== 200 &&
                response.status !== 201 &&
                !response.url.includes("hide_toast=1")
              ) {
                response.data?.message !== "Unauthenticated." &&
                  response.data?.message !== "Please validate required fields.";
                // && toast.error(response.data?.message || "Server error, please try again");
              }

              if (response.status === 401) {
                //debouncedLogout();
              }
              return response;
            },
          },
        }}
      >
        {children}
      </HTTPProvider>
    );
  };
  const token = _getCookies("token") ;
  return (
    <Provider store={store}>
      <UseFetchWrapper token={token}>
        <Component {...pageProps} />
      </UseFetchWrapper>
    </Provider>
  );
}
