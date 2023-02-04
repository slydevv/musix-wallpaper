import html2canvas from "html2canvas";





export const exportImage = async (element, imageName) => {
  
    const canvas = await html2canvas(element)
    const image = canvas.toDataURL("image/png", 1.0); 
    downloadImage(image, imageName);
} 

const downloadImage = (blob, fileName) => {
    const tempLink = window.document.createElement("a");
    tempLink.style = "display:none;"
    tempLink.download = fileName

    tempLink.href= blob;

    document.body.appendChild(tempLink);
tempLink.click();
document.body.removeChild(tempLink);

tempLink.remove()
document.location.href = '/payment'

}