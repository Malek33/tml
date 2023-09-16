import { proxy } from "valtio";

const state = proxy({
    darkMode: true,
  });


export default state