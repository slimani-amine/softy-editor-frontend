interface SlateNode {
  type: string;
  children: { text: string }[];
  [key: string]: string | { text: string }[] | undefined;
}

export function formatDocContent(inputString: string): SlateNode[] {
  const parsedInput = JSON.parse(inputString);
  const inputArray = Array.isArray(parsedInput) ? parsedInput : [parsedInput];
  const formattedArray: SlateNode[] = inputArray.map((obj: any) => {
    const children = Array.isArray(obj.children) ? obj.children : [];
    return {
      type: obj.type,
      children: children.map((child: any) => ({
        text:
          child.text && typeof child.text === 'string' ? child.text.trim() : '',
        ...child,
      })),
      id: obj.id,
      ...obj,
    };
  });

  return formattedArray;
}
