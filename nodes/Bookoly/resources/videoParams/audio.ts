// nodes/Bookoly/resources/videoParams/audio.ts
import { NodePropertyTypes } from 'n8n-workflow';

export const audioUrlParam = {
  displayName: 'Audio URL',
  name: 'audio_url',
  type: 'string' as NodePropertyTypes,
  default: '',
  description: 'The URL of the audio',
  required: true,
  displayOptions: {
    show: {
      operation: ['addAudioToVideo', 'addAudioWithSubtitlesToVideo'],
    },
  },
};

export const trimAudioParam = {
  displayName: 'Trim Audio',
  name: 'trim',
  type: 'boolean' as NodePropertyTypes,
  default: false,
  description: 'Whether to trim the audio to match video length',
  displayOptions: {
    show: {
      operation: ['addAudioToVideo', 'addAudioWithSubtitlesToVideo'],
    },
  },
};

export const audioVolumeParam = {
  displayName: 'Volume',
  name: 'volume',
  type: 'number' as NodePropertyTypes,
  default: 100,
  description:
    'Set audio volume from 0% to 100%. 100% is the original volume, and 50% is half the original volume.',
  displayOptions: {
    show: {
      operation: ['addAudioToVideo', 'addAudioWithSubtitlesToVideo'],
    },
  },
};