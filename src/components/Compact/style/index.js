import config from 'src/config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-compact';

export const controllerPrefix = prefixCls + '-controller';
