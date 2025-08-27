import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const translations = {
  en: {
    welcome: "Welcome to Password Vault",
    secure: "Your secure vault for all things digital",
    description1: "Secure Password Storage",
    description2: "Cross-Platform Sync",
    description3: "Biometric Authentication",
    description4: "Password Generator",
    get_started: "Get Started",
    language_select: "Select Your Language",
    signin: "Sign In",
    signin_method: "Choose your preferred sign-in method",
    pin_code: "PIN Code",
    face_recognition: "Face Recognition",
    back_to_welcome: "Back to Welcome",
    privacy_text: "Your data is securely encrypted and stored.",
    greetings: "How should we call you?",
    continue: "Continue",
    pin_setup: "Set Up Your 6-Digit PIN Code",
    fingerprint: "Enable Fingerprint",
    fingerprint_subtitle: "Use your fingerprint for quick and secure access",
    fingerprint_setup: "Set Up Fingerprint",
    fingerprint_error:
      "Fingerprint authentication is not supported on this device.",
  },
  vi: {
    welcome: "Chào mừng đến Password Vault",
    secure: "Kho chứa an toàn cho các thông tin số hóa",
    description1: "Kho mật khẩu an toàn",
    description2: "Đồng bộ đa nền tảng",
    description3: "Nhận diện sinh trắc học",
    description4: "Tạo mật khẩu tự động",
    get_started: "Bắt đầu",
    language_select: "Chọn ngôn ngữ",
    signin: "Đăng nhập",
    signin_method: "Chọn cách để đăng nhập",
    pin_code: "Mã PIN",
    face_recognition: "Nhận diện khuôn mặt",
    back_to_welcome: "Về trang Chào mừng",
    privacy_text: "Dữ liệu sẽ được lưu trữ dưới dạng mã hóa.",
    greetings: "Bạn tên là gì?",
    continue: "Tiếp tục",
    pin_setup: "Thiết lập mã pin gồm 6 kí tự",
    fingerprint: "Thiết lập mật khẩu vân tay",
    fingerprint_setup: "Thiết lập vân tay",
    fingerprint_error: "Thiết bị không hỗ trợ xác thực vân tay",
  },
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale || "en";
i18n.enableFallback = true;

export default i18n;
