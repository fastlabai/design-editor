import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://fastlabai.github.io',
  base: '/design-editor',
  vite: {
    ssr: {
      external: ['postcss', 'nanoid'],
    },
  },
  integrations: [
    starlight({
      title: '@fastlab-ai/design-editor',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/fastlabai/design-editor' },
      ],
      sidebar: [
        { label: 'Getting Started', link: '/getting-started' },
        { label: 'Next.js', link: '/nextjs' },
        {
          label: 'Providers',
          items: [
            { label: 'Media', link: '/providers/media' },
            { label: 'Fonts', link: '/providers/fonts' },
            { label: 'Background Removal', link: '/providers/background-removal' },
            { label: 'Persistence', link: '/providers/persistence' },
          ],
        },
        { label: 'API Reference', link: '/api' },
      ],
    }),
  ],
})
