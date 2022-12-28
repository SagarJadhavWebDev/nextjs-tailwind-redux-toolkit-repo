export default function _getCookies(name: string) {
  return typeof window !== "undefined"
    ? document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop()
    : "";
}
