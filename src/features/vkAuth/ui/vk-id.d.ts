import { OneTapContentId } from "../model/types";




declare module '@vkid/sdk' {
    export interface ConfigInitParams {
      app: number;
      redirectUrl: string;
      scope?: string;
      state?: string;
    }
  
    export interface OneTapRenderParams {
      container: HTMLElement;
      scheme?: 'light' | 'dark';
      styles?: {
        borderRadius?: number;
        height?: number;
        width?: number;
      }
      showAlternativeLogin?: boolean;
    }
  
    export class OneTap {
      render(params: OneTapRenderParams): this;
      on(event: string, callback: (data: any) => void): this;
      unmount(): void;
    }
  
    export const Config: {
      init(params: ConfigInitParams): void;
    };
  
    export const Auth: {
      exchangeCode(code: string, deviceId: string): Promise<{
        access_token: string;
        user_id: number;
        expires_in: number;
      }>;
    };
  
    export const WidgetEvents: {
      LOGIN_SUCCESS: string;
      ERROR: string;
    };
  }