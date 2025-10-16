---
title: 스토리북 테일윈드를 위한 웹팩 설정 (postcss-loader)
category: tech
---


# 스토리북 테일윈드를 위한 웹팩 설정 (postcss-loader)

```
import type { StorybookConfig } from '@storybook/nextjs'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.module!.rules!.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })

    config.resolve!.plugins = [
      ...(config.resolve!.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve!.extensions,
      }),
    ]

    return config
  },
}
export default config
```

웹팩 설정에 대하여..