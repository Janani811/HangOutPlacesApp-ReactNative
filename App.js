import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo-app-loading";
// import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export function App() {
  const [dbIntialized, setDbInitalized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitalized(true);
      })
      .catch((error) => {
        console.log(error);
      }); //it executes first in app
  }, []);

  if (!dbIntialized) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary600 },
            headerTintColor: Colors.gray500,
            contentStyle: { backgroundColor: Colors.gray500 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorites Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a New Place" }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Loading Place...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
