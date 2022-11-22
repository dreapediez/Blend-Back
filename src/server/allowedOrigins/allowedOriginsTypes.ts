type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>;

type CustomOrigin = (
  requestOrigin: string | undefined,
  callback: (err: Error | undefined, origin?: StaticOrigin) => void
) => void;

export default CustomOrigin;
