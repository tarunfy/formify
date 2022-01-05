module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter"],
        Roboto: ["Roboto"],
        Montserrat: ["Montserrat"],
        Nunito: ["Nunito"],
        Comic: ["Comic Neue"],
      },
      colors: {
        mygreen: "#05E20E",
        mygrey: "#9D9B9B",
        myblack: "#0d0d0d",
        myblack2: "#0c0c0c",
        mygrey2: "#4d4d4d",
        myred: "#FF1700",
        mattBlack: "#050505",
        mygreen2: "#04aa0b",
        mygreen3: "#05cb0d",
        mygreen4: "#50eb56",
        myred2: "#ff0000",
      },
      boxShadow: {
        custom: "0 0 23px 0px rgba(5, 226, 14, 0.3);",
        custom2: "0 0 23px 0px rgba(5, 226, 14, 0.6);",
        custom3: "0 0 15px 0px rgba(5, 226, 14, 0.2);",
        custom4: "0 0 19px 0px rgba(5, 226, 14, 0.4);",
        customDark: "0 0 23px 0px rgba(1, 1, 1, 0.3);",
        customWhite: "0 0 23px 0px rgba(0, 0, 0, 0.6);",
        customDark2: "0px 3px 8px rgba(0, 0, 0, 0.24);",
        customrDark3: "0px 0px 16px rgba(17, 17, 26, 0.1);",
      },
      maxHeight: {
        customHeight: "600px",
        "11/12": "91.33%",
      },
      width: {
        customWidth: "600px",
        customWidth2: "94%",
      },
      screens: {
        bigScreen: "1600px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
