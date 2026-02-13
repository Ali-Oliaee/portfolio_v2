import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  en: () => import('@/messages/en.json').then((module) => module.default),
  fa: () => import('@/messages/fa.json').then((module) => module.default),
};

export const hasLocale = (lang: string): lang is Locale => lang in dictionaries;

export const getDictionary = async (lang: Locale) => dictionaries[lang]();
