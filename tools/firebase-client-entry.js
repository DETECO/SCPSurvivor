export { initializeApp } from 'firebase/app';
export { initializeAuth, connectAuthEmulator, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile,
  sendPasswordResetEmail, sendEmailVerification, reload, GoogleAuthProvider, updateEmail, updatePassword,
  signInWithCredential, browserLocalPersistence, setPersistence,
  verifyPasswordResetCode, confirmPasswordReset, applyActionCode,
  EmailAuthProvider, linkWithCredential, getAdditionalUserInfo, deleteUser } from 'firebase/auth';
export { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';
