import { create } from '@storybook/theming';

// @ts-expect-error webpack import
import logo from './resources/rapida-logo.png';

export default create({
  base: 'light',
  brandTitle: 'cannon-worker',
  brandUrl: 'https://rapidajs.dev',
  brandImage: logo,
});
