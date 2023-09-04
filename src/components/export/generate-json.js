// Function to download the generated JSON as a .json file.
const download = (data, fileName) => {
    const blob = new Blob([data], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName + '.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export const generateJSON=(data, filename)=>{
    const jsonData = JSON.stringify(data, null, 2);
    download(jsonData, filename);
}