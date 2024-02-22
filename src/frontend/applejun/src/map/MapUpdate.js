function MapUpdate() {
  const newWindow = window.open("", "_blank", "width=500,height=500");

  const aaa = async () => {
    //여기에다가 수정하는 로직 작성하면 됨
    return "엄";
  };

  (async () => {
    const result = await aaa();
    newWindow.document.write(result);
  })();

  return "준";
}

export default MapUpdate;
