export default function formatText(text: string) {
  return text
    .split(/\W/)
    .map((word) => word.replace(/\W/g, ''))
    .join(' ');
}
