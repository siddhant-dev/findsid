export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly company: string;
  readonly dates: string;
  readonly location: string;
  readonly achievements: readonly string[];
  readonly tags: readonly string[];
}
