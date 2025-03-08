export const getImageUrl = (src: string) => {
    console.log(src);
    
  return new URL(
    // 本地资源路径
    `/src/assets/${src}`,
    import.meta.url,
  ).href
}
