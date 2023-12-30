const path = require("path");

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@components": path.resolve(__dirname, "./src/components"),
          "@components/*": path.resolve(__dirname, "./src/components/*"),
          "@contexts": path.resolve(__dirname, "./src/contexts"),
          "@contexts/*": path.resolve(__dirname, "./src/contexts/*"),
          "@app": path.resolve(__dirname, "./src/app"),
          "@app/*": path.resolve(__dirname, "./src/app/*"),
          "@api": path.resolve(__dirname, "./src/api"),
          "@api/*": path.resolve(__dirname, "./src/api/*"),
          "@navigation": path.resolve(__dirname, "./src/navigation"),
          "@utils": path.resolve(__dirname, "./src/utils"),
          "@utils/*": path.resolve(__dirname, "./src/utils/*"),
          "@assets": path.resolve(__dirname, "./src/assets"),
          "@assets/*": path.resolve(__dirname, "./src/assets/*"),
        },
        root: ["./"],
        extensions: [".d.ts", ".ts", ".tsx", ".js", "ios.js", ".android.js"],
      },
    ],
  ],
};
