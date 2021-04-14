import React, { useEffect, createContext, useState, useContext } from "react";
import Toast from "react-native-root-toast";
import firebase from "firebase";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeScrollView } from "../components/SafeScrollView";

const UserContext = createContext();

export const withAuth = (Component) => (props) => {
  const value = useContext(UserContext);
  return <Component {...props} {...value} />;
};

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
            isSignedIn: true,
          };
        case "LOG_IN":
          return {
            ...prevState,
            isSignedIn: true,
            token: action.token,
            user: action.user,
          };
        case "LOG_OUT":
          return {
            ...prevState,
            isSignedIn: false,
            token: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignedIn: false,
      token: null,
      user: null,
    }
  );

  const dispatches = React.useMemo(
    () => ({
      login: async ({ email, password }) => {
        try {
          // Todo
          if (!email || !password) {
            throw new Error("All Fields are Required");
          }

          const credentials = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

          const token = credentials.user.uid;
          const user = await firebase
            .firestore()
            .collection("users")
            .doc(token)
            .get();

          dispatch({
            type: "LOG_IN",
            token,
            user: user.data(),
          });

          Toast.show("Logged In 🥳", {
            backgroundColor: "green",
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        } catch (error) {
          Toast.show(error.message, {
            backgroundColor: "orange",
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        }
      },

      logout: async () => {
        console.log("Logout");
        dispatch({ type: "LOG_OUT" });
        await firebase.auth().signOut();
      },

      refreshUser: async (id) => {
        try {
          let user = await firebase
            .firestore()
            .collection("users")
            .doc(id)
            .get();

          dispatch({
            type: "LOG_IN",
            token: id,
            user: user.data(),
          });

          Toast.show("User Refreshed 🥳", {
            backgroundColor: "green",
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        } catch (error) {
          Toast.show(error.message, {
            backgroundColor: "orange",
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        }
      },

      register: async ({ email, password, confirm, name }) => {
        try {
          // Validation
          if (!email || !password || !confirm || !name) {
            throw new Error("All Fields are Required");
          }

          if (password !== confirm) {
            throw new Error("Password Mismatch");
          }

          const credentials = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
          const token = await credentials.user.uid;
          await firebase.firestore().collection("users").doc(token).set({
            email,
            name,
          });

          Toast.show("Registered 🥳", {
            backgroundColor: "green",
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });

          dispatch({
            type: "LOG_IN",
            token,
            user: { name, email },
          });
        } catch (error) {
          Toast.show(error.message, {
            backgroundColor: "orange",
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        }
      },
    }),
    [dispatch]
  );

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        await firebase.auth().onAuthStateChanged(async (res) => {
          if (res) {
            const token = res.uid;
            console.log("token", token);
            let user = await firebase
              .firestore()
              .collection("users")
              .doc(token)
              .get();

            console.log(user.data());

            dispatch({
              type: "LOG_IN",
              token,
              user: user.data(),
            });
          } else {
            dispatch({ type: "LOG_OUT" });
          }
          setLoading(false);
        });
      } catch (e) {
        setLoading(false);
        dispatch({ type: "LOG_OUT" });
      }
    };

    checkAuthState();
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ auth, ...dispatches }}>
      {loading ? (
        <SafeScrollView style={styles.safe}>
          <ActivityIndicator color="#fff" />
        </SafeScrollView>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
