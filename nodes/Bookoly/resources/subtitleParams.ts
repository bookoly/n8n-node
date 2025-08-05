import { INodeProperties } from 'n8n-workflow';
import { languageOptions, subtitleStyleOptions, fontFamilyOptions, positionOptions } from './static';

export const getSubtitleParameters = (operation: string | string[]): INodeProperties[] => [
	{
		displayName: 'Subtitle Style',
		name: 'style',
		type: 'options',
		default: 'simple',
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		options: subtitleStyleOptions,
		description: 'Select a subtitle style. The default is "Simple".',
	},
	{
		displayName: 'Subtitle Language',
		name: 'language',
		type: 'options',
		default: 'en',
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		options: languageOptions,
		description: 'Select the language for subtitles',
	},
	{
		displayName: 'Font Family',
		name: 'font_family',
		type: 'options',
		default: 'Arial',
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		options: fontFamilyOptions,
		description: 'The default subtitle font family is Arial',
	},
	{
		displayName: 'Font Size',
		name: 'font_size',
		type: 'number',
		default: 20,
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'The default subtitle font size is 20',
	},
	{
		displayName: 'Word Color',
		name: 'word_color',
		type: 'color',
		default: '#FEEE15',
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'The subtitle word color given in Hex e.g. #FEEE15 = Yellow',
	},
	{
		displayName: 'Line Color',
		name: 'line_color',
		type: 'color',
		default: '#FFFFFF',
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'The subtitle line color given in Hex e.g. #FFFFFF = White',
	},
	{
		displayName: 'Line Words',
		name: 'line_words',
		type: 'number',
		default: 4,
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'Defines how many words are displayed at a time. Min. = 1, Max. = 10',
	},
	{
		displayName: 'Outline Width',
		name: 'outline_width',
		type: 'number',
		default: 5,
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'The default subtitle outline width is 5',
	},
	{
		displayName: 'Position',
		name: 'position',
		type: 'options',
		default: 'top_left',
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		options: positionOptions,
		description: 'Position of the subtitle on the video',
	},
	{
		displayName: 'Orientation',
		name: 'ltr',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'Whether text flows left-to-right (LTR) or right-to-left (RTL)',
	},
]; 