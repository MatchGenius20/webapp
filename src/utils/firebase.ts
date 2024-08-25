import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  ActionCodeSettings,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FB_APP_ID ?? '',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export default app

export const registerFirebaseUserAndEmail = async (
  email: string,
  password: string,
  redirectUrl: string,
): Promise<{ success: boolean; msg: string }> => {
  try {
    const registerUser = async (email: string, password: string) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
        const mailResponse = await sendVerificationEmail(userCredential.user, {
          url: `${redirectUrl}&fid=${userCredential.user.uid}`,
          handleCodeInApp: true,
        })

        if (!mailResponse.success) {
          return { success: false, msg: mailResponse.msg }
        }

        return {
          success: true,
          msg: 'Registration and email verification successful.',
        }
      } catch (error: any) {
        return { success: false, msg: error.message }
      }
    }

    let result = await registerUser(email, password)
    if (
      !result.success &&
      result.msg === 'Firebase: Error (auth/email-already-in-use).'
    ) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        )
        const mailResponse = await sendVerificationEmail(userCredential.user, {
          url: `${redirectUrl}&fid=${userCredential.user.uid}`,
          handleCodeInApp: true,
        })

        if (!mailResponse.success) {
          return { success: false, msg: mailResponse.msg }
        }

        return {
          success: true,
          msg: 'Sign-in and email verification successful.',
        }
      } catch (error: any) {
        return { success: false, msg: error.message }
      }
    }

    return result
  } catch (error: any) {
    console.error('Error signing up: ', error)
    return {
      success: false,
      msg: error.message || 'An unknown error occurred.',
    }
  }
}

export const sendVerificationEmail = async (
  user: any,
  actionCodeSettings: ActionCodeSettings,
) => {
  try {
    await sendEmailVerification(user, actionCodeSettings)
    console.log('Verification email sent.')
    return {
      success: true,
      msg: 'Mail sent',
    }
  } catch (error: any) {
    console.error('Error sending email: ', error)
    return {
      success: false,
      msg: error?.message,
    }
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      success: true,
      msg: 'Password reset email sent! Check your inbox.',
    }
  } catch (error: any) {
    console.error('Error sending password reset email:', error)
    if (error.code === 'auth/user-not-found') {
      return {
        success: false,
        msg: 'User not found!',
      }
    } else {
      return {
        success: false,
        msg: 'Error sending password reset email. Please try again.',
      }
    }
  }
}
