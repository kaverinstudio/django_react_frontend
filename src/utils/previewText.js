export const previewText = (text) => {
  let textLength = 140;
  if(text.length > textLength){
    let a=text.substring(0, textLength);
    return a.substring(0,Math.max(a.lastIndexOf(' '),a.lastIndexOf(',')-1)) + '...';
  }else{
    return text;
  }
}