export interface UserReducerInitialState {
  userReducer: {
    user: string;
  };
}

export interface AuthInputProps {
  icon: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface AppContextType {
  user: { name: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  credit: number | undefined; // Match the type used in useState
  setCredit: React.Dispatch<React.SetStateAction<number | undefined>>; // Match the type of credit
  backendUrl: string;
  loadCreditsData: () => void;
  handleLogout: () => void;
  handleGenerateImage: (prompt: string) => Promise<string | void>;
}

interface ObjectResopnseType {
  token: string;
  user: { name: string };
  credits?: number;
}

export interface AuthResponseType {
  success: boolean;
  token: string;
  message: ObjectResopnseType | string;
}

export interface AuthResponseDataType {
  success: boolean;
  message: ObjectResopnseType | string;
  credits?: number;
}

export interface ImageResponseType {
  success: boolean;
  token: string;
  message: ObjectResopnseType | string;
}

export interface ImageResponseDataType {
  message: {
    success: boolean;
    message: string;
    creditBalance: number;
    resultImage: string;
  };
}
