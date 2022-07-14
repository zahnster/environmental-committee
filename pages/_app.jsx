import { CustomizationProvider } from "@twilio-paste/customization";
import { Theme } from "@twilio-paste/theme";
import { Box } from "@twilio-paste/box";

const MyApp = ({ Component, pageProps }) => {
  return (
    <CustomizationProvider
      baseTheme="default"
      theme={{
        backgroundColors: {
          colorBackgroundBrand: "#164f22",
          highestPriority: "#84dc93",
          highestPriorityWeak: "#e7f8e9",
          highPriority: "#47dfc8",
          highPriorityWeak: "#def9f3",
          mediumPriority: "#49b9ef",
          mediumPriorityWeak: "#ebf5fc",
          lowPriority: "#8eadf3",
          lowPriorityWeak: "#f1f3fd",
          shouldNotPrioritize: "#bea0ec",
          shouldNotPrioritizeWeak: "#f6f2fb",
          unranked: "#eac56a",
          unrankedWeak: "#fdf2e0",
          card: "#ffffffcc",
        },
      }}
    >
      <Box>
        <Component {...pageProps} />
      </Box>
    </CustomizationProvider>
  );
};

export default MyApp;
