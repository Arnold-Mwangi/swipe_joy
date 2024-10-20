// global.d.ts

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  }
  
  declare global {
    interface Window {
      Telegram?: {
        WebApp?: {
          initDataUnsafe: {
            user: TelegramUser;
          };
          startParam: string;
        };
      };
    }
  }
  
  export {};
  