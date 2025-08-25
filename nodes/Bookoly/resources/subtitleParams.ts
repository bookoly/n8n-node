import { INodeProperties } from 'n8n-workflow';
import {
	languageOptions,
	subtitleStyleOptions,
	fontFamilyOptions,
	positionOptions,
} from './static';

export const getSubtitleParameters = (operation: string | string[]): INodeProperties[] => [
	{
		displayName: 'Subtitle - Style',
		name: 'style',
		type: 'options',
		default: 'highlight_current_word',
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		options: subtitleStyleOptions,
		description: 'Select a subtitle style. The default is "Highlight Current Word".',
	},
	{
		displayName: 'Subtitle - Language',
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
		displayName: 'Subtitle - Font Family',
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
		displayName: 'Subtitle - Font Size',
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
		displayName: 'Subtitle - Word Color',
		name: 'word_color',
		type: 'color',
		default: '#FEEE15',
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'The subtitle word color given in HEX e.g. #FEEE15 = Yellow',
	},
	{
		displayName: 'Subtitle - Line Color',
		name: 'line_color',
		type: 'color',
		default: '#FFFFFF',
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'The subtitle line color given in HEX e.g. #FFFFFF = White',
	},
	{
		displayName: 'Subtitle - Line Words',
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
		displayName: 'Subtitle - Outline Width',
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
		displayName: 'Subtitle - Position',
		name: 'position',
		type: 'options',
		default: 'mid_bottom_center',
		required: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		options: positionOptions,
		description: 'Specifies where subtitles are displayed on the video',
	},
	{
		displayName: 'Subtitle - Orientation',
		name: 'ltr',
		type: 'options',
		options: [
			{
				name: 'Left to Right',
				value: true,
				description: 'Display subtitles from left to right',
			},
			{
				name: 'Right to Left',
				value: false,
				description: 'Display subtitles from right to left',
			},
		],
		default: true,
		displayOptions: {
			show: {
				operation: Array.isArray(operation) ? operation : [operation],
			},
		},
		description: 'Choose the subtitle text orientation',
	},
];
