/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";

import { QueryProvider } from "@contexts";
import { MainNavigation } from "@navigation/MainNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import { commonStyles } from "src/CommonStyles";

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <KeyboardAvoidingView style={commonStyles.fullSize} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <MainNavigation />
        </KeyboardAvoidingView>
      </QueryProvider>
    </SafeAreaProvider>
  );
};

export default App;
