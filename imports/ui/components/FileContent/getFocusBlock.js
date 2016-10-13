export const getFocusBlock = function getFocusBlock(blocks, key) {
  return blocks.filter(obj => obj.content.key === key)[0];
};
