import type {
  FilledContentRelationshipField,
  ImageFieldImage,
  KeyTextField,
  LinkField,
  RichTextField,
} from '@prismicio/client';
import { isFilled } from '@prismicio/client';

/** ---------- basic readers ---------- */
export function readLink(v: unknown): LinkField | null {
  return v && typeof v === 'object' ? (v as LinkField) : null;
}
export function readRichText(v: unknown): RichTextField | null {
  return Array.isArray(v) ? (v as RichTextField) : null;
}
export function readKeyText(v: unknown): string {
  return typeof v === 'string' ? ((v as KeyTextField) ?? '') : '';
}
export function readBool(v: unknown): boolean {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1;
  if (typeof v === 'string') return v.toLowerCase() === 'true' || v === '1';
  return false;
}
export function readImage(v: unknown): ImageFieldImage | null {
  // cast only for the check; returned type is strict
  return isFilled.image(v as any) ? (v as ImageFieldImage) : null;
}

/** ---------- helpers for loose slice shapes ---------- */

/** Type guard: unknown → FilledContentRelationshipField<T> */
function isFilledRel<T extends string>(
  v: unknown
): v is FilledContentRelationshipField<T> {
  // `isFilled.contentRelationship` expects a Prismic union; allow it for the check only
  return isFilled.contentRelationship(v as any);
}

/**
 * Pick a content relationship by checking multiple candidate keys on an item.
 * Example: pickRelationship(it, ['project', 'projects']) // returns filled rel or null
 */
export function pickRelationship<
  TType extends string = string,
  TItem extends Record<string, unknown> = Record<string, unknown>,
>(
  item: TItem,
  keys: ReadonlyArray<keyof TItem | string>
): FilledContentRelationshipField<TType> | null {
  const obj = item as Record<string, unknown>;
  for (const k of keys) {
    const maybe = obj[k as string];
    if (isFilledRel<TType>(maybe)) return maybe;
  }
  return null;
}

/** Type guard: array of shaped objects (e.g., tech list). */
export function asArrayOfObjects<T extends Record<string, unknown>>(
  v: unknown
): v is T[] {
  return Array.isArray(v) && v.every((x) => !!x && typeof x === 'object');
}
