const extractFileNameAddPath = (filePath) => {
  // filePath를 backslash(\) 또는 forward slash(/)를 기준으로 나눕니다.
  const parts = filePath.split(/[\\/]/);

  // 배열의 마지막 요소를 제거하고 반환합니다. 이것이 파일 이름입니다.
  const fileName = parts.pop();

  const returnValue = `../post-image/${fileName}`;
  console.log(returnValue);

  // './post-image/'와 파일 이름을 합쳐서 반환합니다.
  return returnValue;
};

export default extractFileNameAddPath;
