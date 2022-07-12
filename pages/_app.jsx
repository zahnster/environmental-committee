import { Theme } from "@twilio-paste/theme";
import { Box } from "@twilio-paste/box";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Theme.Provider theme="default">
      <Box padding="space50">
        <Component {...pageProps} />
      </Box>
    </Theme.Provider>
  );
};

export default MyApp;
