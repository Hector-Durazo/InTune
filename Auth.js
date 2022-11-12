import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase.config.js";

let AuthProps = {
    user: User,
    login: ()=>{},
    logout: ()=>{}
};

const writeUser = async (id, username) => {
    const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify({id, username}),
        headers: { "Content-Type": "application/json" },
    });
};

const auth = getAuth(app);

const 