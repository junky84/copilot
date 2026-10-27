/** Vite inlines these as data URLs. */
declare module "*.woff2?inline" {
  const src: string;
  export default src;
}
