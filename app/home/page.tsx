'use client'

import { useState } from "react"

export default function Home(){

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) =>{
        setFile(event.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () =>{
         if(!file){
            setMessage('Molimo dodajte file');
            return;
         }
    
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try{
        const respones = await fetch("https://localhost:5000/upload", {
            method: 'POST',
            body: formData,
        });

        if(respones.ok){
            const data = await respones.json();
            setMessage(`Upload upsješan! File name: ${data.fileName}` );
            setFile(null);
        }else{
            setMessage('Upload failed')
        }

    }catch(error){
        console.log("Error file uploading:", error)
        setMessage('An error occured during upload');

    }finally{
        setIsUploading(false);
    };
};

    return(
       <div>
        <h1>Upload Image&Video</h1>

        <input type="file" onChange={handleFileChange} accept="image/*,video/*" />
        <button onClick={handleUpload} disabled={!file || isUploading} 
        >
            {isUploading ? 'Uploading...' : 'Upload'}

        </button>

        {message && <p>{message}</p>}

        
       </div>
    )
}

