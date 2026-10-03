import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '20pcz8by',
    dataset: 'production'
  },
  deployment: {
    // The Studio at https://side-project-graveyard.sanity.studio
    appId: 'jh0ye6a0rivmpk6qcbucxywy',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
