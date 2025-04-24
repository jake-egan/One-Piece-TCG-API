import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import Discovered from "../app/screens/Discovered";

// the translations
const resources = {
  en: {
    translation: {
      login: {
        username: "Username",
        password: "Password",
        signin: "Sign in",
        createAccount: "Create Account",
        failedCreate: "Credentials already used",
        failedLogin: "Incorrect login details"
      },
      packs: {
        op01name: "Romance Dawn OP01",
        op02name: "Paramount War OP02",
        failed:"failed to open pack",
        openAnother: "Open Another"
      },
      tabs: {
        home: "Home",
        discovered: "Discovered",
        settings:"Settings",
        login: "Login"
      },
      settings: {
        signout: "Sign Out"
      },
      discovered: {
        back: "Back",
        deleteDiscovery : "Delete Discovery",
        delete:"delete",
        cancel:"cancel",
        confirm:"confirmation",
        proceed:"Do you want to proceed?",
        failureDelete:"Failed to delete card",
        failureDiscover:"Failed Discovered cards",
        cardrarity:"Card Rarity :"
        
        
      }
    },
  },
  ja: {
    translation: {
      login: {
        username: "ユーザー名",
        password: "パスワード",
        signin: "サインイン",
        createAccount: "アカウントを作成",
        failedCreate: "認証情報はすでに使用されています",
        failedLogin: "間違ったログイン詳細"
      },
      packs: {
        op01name: "ロマンスドーン OP01",
        op02name: "ちょうじょうけっせん OP02",
        failed: "パケットを開けませんでした",
        openAnother: "別のを開く"
      },
      tabs: {
        home: "家",
        discovered: "発見した",
        settings:"設定",
        login: "ログイン"
      },
      settings: {
        signout: "サインアウト"
      },
      discovered: {
        back: "戻る",
        deleteDiscovery: "発見を削除",
        delete: "削除",
        cancel: "キャンセル",
        confirm: "確認",
        proceed: "続行しますか？",
        failureDelete: "カードの削除に失敗しました。",
        failureDiscover: "発見されたカードの読み込みに失敗しました。",
        cardrarity:"カードのレアリティ :"
      }
    }
  }
};


const fallbackLng = "en";
const deviceLanguage = Localization.locale.split("-")[0]; // the strip is for dialects / different types of languages e.g en-US 
const supportedLanguages = Object.keys(resources);
const lng = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : fallbackLng;

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng,
  interpolation: {
    escapeValue: false, // react already handles XSS
  },
});

export default i18n;
