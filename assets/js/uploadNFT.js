
//UPLOAD FILE

uploadImage = async () =>{

    const data = fileInput.files[0]
    const file = new Moralis.File(data.name, data)
    await file.saveIPFS();

    console.log(file.ipfs(), file.hash());
    return file.ipfs();
}
//Upload Metadata



  const uploadMetadata = async (imageURL) =>{

    const name = document.getElementById('metadataName').value;
    const object = {
        "name" : name,
        "image": imageURL
      }

    const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(object))});
    await file.saveIPFS();

    console.log(file.ipfs());

  }

  //function katree

  const katree = async function (){

    const image = await uploadImage();
    await uploadMetadata(image)
  }


///TEST

const test = async () => {
  console.log("hola mundo");
  const image = await uploadImage();
    await uploadMetadata(image)

}


