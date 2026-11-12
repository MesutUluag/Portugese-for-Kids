export interface GisCredentialResponse {
  credential: string;
  select_by?: string;
  clientId?: string;
}

export interface GisPromptNotification {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getNotDisplayedReason: () => string;
  getSkippedReason: () => string;
  getDismissedReason: () => string;
  getMomentType: () => string;
}

export interface GisButtonOptions {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: number | string;
  locale?: string;
}

export interface GisInitConfig {
  client_id: string;
  callback: (response: GisCredentialResponse) => void | Promise<void>;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  itp_support?: boolean;
  use_fedcm_for_prompt?: boolean;
  prompt_parent_id?: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GisInitConfig) => void;
          prompt: (momentListener?: (notification: GisPromptNotification) => void) => void;
          renderButton: (parent: HTMLElement, options: GisButtonOptions) => void;
          cancel: () => void;
          disableAutoSelect: () => void;
          storeCredential?: (credential: unknown, callback?: () => void) => void;
        };
      };
    };
  }
}
