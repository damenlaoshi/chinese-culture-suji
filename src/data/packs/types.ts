import type { Paragraph, Prompt, Section, SkeletonBeat, VocabItem } from "../types";

export type TopicPack = {
  slug: string;
  minutes?: number;
  lookFor: Paragraph[];
  sections: Section[];
  oralSkeleton: SkeletonBeat[];
  oralPrompts: Prompt[];
  followUps: Prompt[];
  vocab: VocabItem[];
};
