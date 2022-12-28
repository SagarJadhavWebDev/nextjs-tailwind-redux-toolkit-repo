import Router from "next/router";
import routes from "@/constants/routes";
import cookies from "next-cookies";

const login = routes.login;

const checkUserAuthentication = (checkCookie) => {
  return {
    auth: !(checkCookie === undefined || checkCookie === null || checkCookie.length <= 0)
  }; // change auth to { islogged: true } for test it.
};

const withPrivateRoute = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;
  hocComponent.getInitialProps = async (context) => {
    const authCookie = cookies(context).token;
    const userAuth = await checkUserAuthentication(authCookie);

    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userAuth
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};

export default withPrivateRoute;
