import React from 'react'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = React.useState();
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
        return unsubscribe;
    }, []);

    return {
        user
    };
}

auth.useDeviceLanguage();
const verifier = window.recaptchaVerifier;


const signInSend = (phone) => {

    window.recaptchaVerifier = auth.RecaptchaVerifier('signInButton', {
        'size': 'invisible',
    });

    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
        .then((res) => {
            console.log("Confirmation code sent")
            window.confirmationResult = res;
            return true;
        }).catch((error) => {
            console.log(error)
            return false;
        })
}

const signInConfirm = (code) => {
    window.confirmationResult.confirm(code).then((res) => {
        // Successful sign in
        return res.user;
    }).catch((err) => {
        // Failed sign in
    });
}

export {auth, verifier, signInSend, signInConfirm}