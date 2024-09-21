import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

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
    image_password: "Image Password",
    fingerprint: "Fingerprint",
    face_recognition: "Face Recognition",
    back_to_welcome: "Back to Welcome",
    privacy_text: "Your data is securely encrypted and stored.",
    greetings: "How should we call you?",
    continue: "Continue",
    pin_setup: "Set Up Your 6-Digit PIN Code",
    fingerprint: "Set Up Fingerprint Authentication",
    fingerprint_setup: "Set Up Fingerprint",
    fingerprint_error: "Fingerprint authentication is not supported on this device."
  },
  es: {
    welcome: "Bienvenido a Password Vault",
    secure: "Tu bóveda segura para todo lo digital",
    description1: "Almacenamiento seguro de contraseñas",
    description2: "Sincronización multiplataforma",
    description3: "Autenticación biométrica",
    description4: "Generador de contraseñas",
    get_started: "Comenzar",
    language_select: "Selecciona tu idioma",
    image_password: "Contraseña de imagen",
    fingerprint: "Huella digital",
    face_recognition: "Reconocimiento facial",
    back_to_welcome: "Volver a Bienvenida",
    privacy_text: "Sus datos se cifran y almacenan de forma segura.",
    greetings: "¿Cómo deberíamos llamarte?",
    continue: "Continuar",
    pin_setup: "Configure su código PIN de 6 dígitos",
    fingerprint: "Configurar la autenticación de huellas dactilares",
    fingerprint_setup: "Configurar huella dactilar",
    fingerprint_error: "La autenticación por huella dactilar no es compatible con este dispositivo."
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
    image_password: "Mật khẩu hình ảnh",
    fingerprint: "Mật khẩu vân tay",
    face_recognition: "Nhận diện khuôn mặt",
    back_to_welcome: "Về trang Chào mừng",
    privacy_text: "Dữ liệu sẽ được lưu trữ dưới dạng mã hóa.",
    greetings: "Bạn tên là gì?",
    continue: "Tiếp tục",
    pin_setup: "Thiết lập mã pin gồm 6 kí tự",
    fingerprint: "Thiết lập khóa vân tay",
    fingerprint_setup: "Thiết lập vân tay",
    fingerprint_error: "Thiết bị không hỗ trợ xác thực vân tay"
  },
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;
