export function minifyJson(selection?: string): string {
  if (!selection) {
    throw new Error('No text selected');
  }

  try {
    const jsonObject = JSON.parse(selection);
    return JSON.stringify(jsonObject);
  } catch (error) {
    throw new Error('Invalid JSON string provided');
  }
}
