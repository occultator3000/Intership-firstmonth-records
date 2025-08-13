import {configureStore}from "@reduxjs/toolkit";

//导入自己创建的reducer

import reducer from "../reducer";

const store =configureStore({
    reducer: reducer,
});

export default store;