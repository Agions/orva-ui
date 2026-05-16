const noop = () => {};
const noopPromise = () => Promise.resolve();

const handler = {
  get(_target: any, prop: string) {
    if (prop === 'then' || prop === 'catch') return undefined;
    if (prop.startsWith('use')) return noop;
    if (prop.startsWith('get') || prop.startsWith('set') || prop.startsWith('choose') || prop.startsWith('open') || prop.startsWith('navigate') || prop.startsWith('request') || prop.startsWith('scan') || prop.startsWith('save') || prop.startsWith('remove') || prop.startsWith('clear') || prop.startsWith('vibrate')) {
      return noop;
    }
    return noop;
  },
};

const Taro = new Proxy({} as any, handler);

export const ENV_TYPE = {
  WEAPP: 'WEAPP',
  ALIPAY: 'ALIPAY',
  SWAN: 'SWAN',
  TT: 'TT',
  QQ: 'QQ',
  JD: 'JD',
  WEB: 'WEB',
  RN: 'RN',
};

export default Taro;
export const getEnv = () => 'WEB';
export const getSystemInfoSync = () => ({});
export const getAccountInfoSync = () => ({ miniProgram: {} });
