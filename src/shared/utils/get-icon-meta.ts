import { SPRITES_META, SpritesMap } from '../types/icon.ts';
import { IconName } from '../ui/icon/icon.tsx';

export const getIconMeta = <Key extends keyof SpritesMap>(
  name: IconName<Key>,
) => {
  const [spriteName, iconName] = name.split('/') as [Key, SpritesMap[Key]];

  const { filePath, items } = SPRITES_META[spriteName];

  const viewBox = items[iconName]?.viewBox || '';

  const defaultSize = { height: 16, width: 16 };

  if (viewBox) {
    const [width, height] = viewBox.split(' ').slice(-2);

    defaultSize.height = Number(height);
    defaultSize.width = Number(width);
  }

  return {
    defaultSize,
    filePath,
    iconName,
    viewBox,
  };
};
